'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, ShoppingBag, Menu, X, Terminal } from 'lucide-react';
import { useStore } from '@/components/store/store-provider';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/services?category=Penetration+Testing', label: 'Pentest' },
  { href: '/services?category=Cloud+Security+Assessment', label: 'Cloud' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled
            ? 'border-primary/20 bg-background/95 backdrop-blur-md'
            : 'border-border bg-background/80 backdrop-blur',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="-ml-2 flex h-10 w-10 items-center justify-center text-primary lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold tracking-tight text-primary glow-text">
                NEXUS
              </span>
              <span className="font-mono text-lg font-bold tracking-tight text-foreground/40">
                //
              </span>
              <span className="font-mono text-lg font-bold tracking-tight text-accent glow-text-cyan">
                SEC
              </span>
            </Link>
          </div>

          {/* Center nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="hidden items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-accent sm:flex"
            >
              <Terminal className="h-4 w-4" />
              Catalog
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-primary"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-2xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-sm animate-slide-in-right border-r border-primary/20 bg-background-elevated p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-primary glow-text">
                NEXUS//SEC
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center text-foreground/60"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-border py-3.5 font-mono text-sm uppercase tracking-widest text-foreground/80 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex items-center gap-2 border border-primary/20 p-4">
              <Shield className="h-5 w-5 text-primary" />
              <p className="font-mono text-2xs uppercase tracking-widest text-foreground/60">
                Authorized Testing Only
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
