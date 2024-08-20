import { z } from "zod";

const envVars = z.object({
  PORT: z.string(),
  CLIENT_URL: z.string(),
  SERVER_URL: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

envVars.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
