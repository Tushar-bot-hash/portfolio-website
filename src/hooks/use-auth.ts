"use client";

import { useSession } from '@/lib/auth-client';

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    status,
    isAuthenticated: !!session?.user
  };
}