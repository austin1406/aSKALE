/** True when every listed environment variable is set and non-empty. */
export function hasEnv(...keys: string[]) {
  return keys.every((k) => Boolean(process.env[k]));
}

export const isProd = process.env.NODE_ENV === "production";
