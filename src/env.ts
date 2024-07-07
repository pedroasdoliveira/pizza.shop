import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

// import.meta do Vite é igual ao process.env do Node
export const env = envSchema.parse(import.meta.env);
