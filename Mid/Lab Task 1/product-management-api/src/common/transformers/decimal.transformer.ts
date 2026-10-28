import { ValueTransformer } from "typeorm";

// pg returns NUMERIC as a string; convert price back to a number.
export const decimalTransformer: ValueTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) =>
    value === null || value === undefined ? value : parseFloat(value),
};
