import { z } from "zod";

const envSchema = z.object({
  VITE_ROOT_ELEMENT_ID: z.string(),
  VITE_APP_TITLE: z.string(),
  VITE_API_URL: z.string(),
  VITE_CLIENT_ID: z.string(),
  VITE_CLIENT_SECRET: z.string(),
});

const config = envSchema.parse(import.meta.env);

export default config;
