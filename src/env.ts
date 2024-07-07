import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_REQUEST_DELAY: z.string().transform((value) => value === "true"),
});

// import.meta do Vite é igual ao process.env do Node
export const env = envSchema.parse(import.meta.env);
