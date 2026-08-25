import Link from 'next/link';
import { Shield, Lock, Terminal } from 'lucide-react';
import { categories } from '@/lib/data';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-primary/20 bg-background-elevated">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-mono text-xl font-bold text-primary glow-text">
                NEXUS
              </span>
              <span className="font-mono text-xl font-bold text-foreground/40">
                //
              </span>
              <span className="font-mono text-xl font-bold text-accent glow-text-cyan">
                SEC
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-foreground/50">
              Authorized cybersecurity services. Penetration testing, security
              audits, and incident response — performed with explicit
              authorization from system owners.
            </p>
            <div className="mt-6 flex items-center gap-2 border border-primary/20 px-3 py-2">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-2xs uppercase tracking-widest text-foreground/50">
                All testing authorized
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/services?category=${encodeURIComponent(cat)}`}
                    className="font-mono text-xs text-foreground/60 transition-colors hover:text-primary"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More services */}
          <div>
            <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
              More
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/services?category=${encodeURIComponent(cat)}`}
                    className="font-mono text-xs text-foreground/60 transition-colors hover:text-primary"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="#" className="font-mono text-xs text-foreground/60 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="font-mono text-xs text-foreground/60 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="font-mono text-xs text-foreground/60 hover:text-primary">
                  Authorization Requirements
                </Link>
              </li>
              <li>
                <Link href="#" className="font-mono text-xs text-foreground/60 hover:text-primary">
                  Responsible Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
            © {new Date().getFullYear()} NEXUS//SEC. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-foreground/40" />
            <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
              Authorized access only — Unauthorized testing is not permitted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
