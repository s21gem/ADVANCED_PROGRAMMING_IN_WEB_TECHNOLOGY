import { ValueTransformer } from "typeorm";

/**
 * PostgreSQL returns NUMERIC columns as strings to avoid precision loss.
 * Prices here fit comfortably in a JS number, so convert on the way out.
 */
export const decimalTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) =>
    value === null || value === undefined ? value : parseFloat(value),
};
