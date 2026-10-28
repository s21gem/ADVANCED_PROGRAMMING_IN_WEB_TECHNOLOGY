import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;

// Stored as "<salt>:<hash>" in hex.
export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(plain, salt, KEY_LENGTH);
  return `${salt}:${hash.toString("hex")}`;
}
