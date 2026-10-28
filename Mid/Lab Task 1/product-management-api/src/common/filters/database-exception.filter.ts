import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

// PostgreSQL error codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG_UNIQUE_VIOLATION = "23505";
const PG_CHECK_VIOLATION = "23514";

interface PgDriverError {
  code?: string;
  detail?: string;
  constraint?: string;
}

/**
 * Turns raw database errors into clean HTTP responses instead of a 500.
 */
@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();
    const pg = exception.driverError as PgDriverError;

    if (pg.code === PG_UNIQUE_VIOLATION) {
      res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        error: "Conflict",
        message: this.describeUnique(pg),
      });
      return;
    }

    if (pg.code === PG_CHECK_VIOLATION) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: "Bad Request",
        message: `Value violates rule "${pg.constraint ?? "check"}"`,
      });
      return;
    }

    this.logger.error(exception.message, exception.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "Internal Server Error",
      message: "A database error occurred",
    });
  }

  private describeUnique(pg: PgDriverError): string {
    // detail looks like: Key (email)=(a@b.com) already exists.
    const match = pg.detail?.match(/Key \((.+?)\)=\((.+?)\)/);
    return match
      ? `${match[1]} "${match[2]}" already exists`
      : "Duplicate value violates a unique constraint";
  }
}
