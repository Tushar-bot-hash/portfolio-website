// hooks/use-auth.ts
"use client";

import { useSession } from '@/lib/auth-client';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  
  console.log('🔐 useAuth Debug:', {
    status,
    session,
    hasUser: !!session?.user,
    user: session?.user
  });
  
  return {
    user: session?.user as User | null,
    status: status as "loading" | "authenticated" | "unauthenticated",
    isAuthenticated: !!session?.user
  };
}