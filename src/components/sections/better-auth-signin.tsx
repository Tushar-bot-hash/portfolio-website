// components/better-auth-signin.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

export function BetterAuthSignIn() {
  const handleSignIn = async () => {
    console.log('1. Sign in button clicked');
    
    try {
      console.log('2. Calling signIn("github")');
      const result = await signIn("github");
      console.log('3. Sign in result:', result);
    } catch (error) {
      console.error('4. Sign in error:', error);
      console.error('5. Error details:', error.message, error.stack);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <Button 
        onClick={handleSignIn} 
        variant="outline" 
        size="lg" 
        className="gap-2"
      >
        <Github className="h-5 w-5" />
        Sign in with GitHub
      </Button>
      <span className="text-xs text-muted-foreground">Powered by Better Auth</span>
    </div>
  );
}