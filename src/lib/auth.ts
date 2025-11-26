// lib/auth.ts - CORRECT SYNTAX FOR v1.3.32
import { betterAuth } from "better-auth";
import { github } from "better-auth/providers/github"; // Must import separately

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!, // REQUIRED
  baseURL: process.env.NEXT_PUBLIC_SITE_URL!, // REQUIRED
  providers: [ // Use "providers" array (not "socialProviders")
    github({ // Use the imported github function
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
});