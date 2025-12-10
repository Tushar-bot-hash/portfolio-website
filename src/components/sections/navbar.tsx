"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Github, Linkedin, Globe, Coffee } from 'lucide-react';

import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { signIn, signOut } from '@/lib/auth-client';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
  coffee: Coffee,
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const { scrollY } = useScroll();
  const { user, status } = useAuth();

  // Debug environment variables
  React.useEffect(() => {
    console.log('Vercel Env Check:', {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      hasClientId: !!process.env.GITHUB_CLIENT_ID,
      hasSecret: !!process.env.BETTER_AUTH_SECRET
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: isVisible ? 0 : -100 
      }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        y: { duration: 0.3, ease: 'easeInOut' }
      }}
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 navbar-underline">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {siteConfig.author.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <span className="hidden sm:block font-semibold text-foreground">
              {siteConfig.author}
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
            {siteConfig.navigation.map((item: { label: string; href: string }) => (
              <motion.div
                whileHover={{ y: -3 }}
                whileFocus={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="inline-block"
                key={item.href}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground/80 focus:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                  tabIndex={0}
                >
                  <span className="relative">
                    {item.label}
                    <motion.div
                      className="absolute left-0 right-0 -bottom-1 h-0.5 rounded group-hover:scale-x-100 group-focus:scale-x-100 scale-x-0 transition-transform"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      whileFocus={{ scaleX: 1 }}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                      style={{ transformOrigin: 'left', background: 'var(--navbar-underline)' }}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Link */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 w-8 p-0"
          >
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          {/* Auth Button */}
          {status === "loading" ? (
            <div className="h-8 w-20 bg-muted rounded animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <img 
                src={user.image!} 
                alt={user.name!} 
                className="h-6 w-6 rounded-full"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => signOut()}
                className="text-xs hidden sm:flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => signIn("github")}
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">
                  {siteConfig.siteName}
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Navigation Links */}
                <nav className="space-y-1">
                  {siteConfig.navigation.map((item: { label: string; href: string }) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground/60 hover:text-foreground'
                      )}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <Badge variant="secondary" className="ml-auto">
                          Current
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>

                <Separator />

                {/* Auth Section in Mobile Menu */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Account</h3>
                  {status === "loading" ? (
                    <div className="h-9 w-full bg-muted rounded animate-pulse" />
                  ) : user ? (
                    <div className="flex items-center gap-3 p-2 rounded-md bg-accent">
                      <img 
                        src={user.image!} 
                        alt={user.name!} 
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => signOut()}
                        className="text-xs"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => signIn("github")}
                      className="w-full gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Sign in with GitHub
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Bio */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {siteConfig.description}
                  </p>
                </div>

                <Separator />

                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Connect</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {siteConfig.social.map((social: { label: string; url: string; icon?: string }) => {
                      const Icon = social.icon ? iconMap[social.icon as keyof typeof iconMap] : null;
                      return (
                        <Button
                          key={social.url}
                          variant="outline"
                          size="sm"
                          asChild
                          className="justify-start"
                        >
                          <Link
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {Icon && <Icon className="mr-2 h-4 w-4" />}
                            {social.label}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}