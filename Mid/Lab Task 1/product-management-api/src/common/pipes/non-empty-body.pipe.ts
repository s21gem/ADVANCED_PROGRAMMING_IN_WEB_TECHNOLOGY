import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

// Rejects PATCH requests with an empty body.
@Injectable()
export class NonEmptyBodyPipe implements PipeTransform {
  transform<T extends object>(value: T): T {
    if (!value || Object.keys(value).length === 0) {
      throw new BadRequestException(
        "Request body must contain at least one field to update",
      );
    }
    return value;
  }
}
