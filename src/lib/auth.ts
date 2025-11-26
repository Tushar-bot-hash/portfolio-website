// lib/auth.ts
import { betterAuth } from "better-auth";
import { github } from "better-auth/providers/github";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
  database: drizzleAdapter(/* your database config */),
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
});