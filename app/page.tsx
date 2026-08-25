import Link from 'next/link';
import { Shield, Terminal, Lock, Zap, ArrowRight, CheckCircle2, Bug, Server, Cloud } from 'lucide-react';
import { products, getFeaturedProducts, categories, formatPrice } from '@/lib/data';
import { ProductCard } from '@/components/store/product-card';

const heroImage =
  'https://images.pexels.com/photos/5380603/pexels-photo-5380603.jpeg?auto=compress&cs=tinysrgb&w=1600';

const stats = [
  { value: '500+', label: 'Assessments' },
  { value: '15', label: 'Service Lines' },
  { value: '24/7', label: 'Incident Response' },
  { value: '100%', label: 'Authorized' },
];

const features = [
  {
    icon: Shield,
    title: 'Authorized Testing',
    body: 'Every engagement requires explicit written authorization from the system owner. No exceptions, no shortcuts.',
  },
  {
    icon: Terminal,
    title: 'Manual + Automated',
    body: 'We combine automated scanning with deep manual testing to find what scanners miss — business logic, chaining, and context-dependent flaws.',
  },
  {
    icon: Lock,
    title: 'Confidential Reporting',
    body: 'Encrypted delivery of all findings. Your data is never shared, sold, or stored beyond the engagement window.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    body: 'Most assessments complete within 7–12 business days, with emergency incident response available 24/7.',
  },
];

const steps = [
  { num: '01', title: 'Request Scope', body: 'Select a service and define your in-scope systems. We review and confirm authorization.' },
  { num: '02', title: 'Engage Testing', body: 'Our engineers begin testing within the agreed window, with regular status updates.' },
  { num: '03', title: 'Receive Report', body: 'Get a detailed report with CVSS-scored findings, proof-of-concepts, and remediation guidance.' },
  { num: '04', title: 'Remediate & Re-test', body: 'Implement fixes and we verify them with a complimentary re-test round.' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-primary/20">
        <div className="container-page grid items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
              <span className="font-mono text-2xs uppercase tracking-widest text-primary">
                System Status: Operational
              </span>
            </div>
            <h1 className="mt-6 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-primary glow-text">Authorized</span>{' '}
              <span className="text-foreground">Cybersecurity</span>
              <br />
              <span className="text-accent glow-text-cyan">Services</span>
            </h1>
            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-foreground/60">
              Penetration testing, security audits, and incident response —
              performed by senior engineers with explicit authorization from
              system owners. Find your vulnerabilities before someone else does.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="group flex h-12 items-center justify-center gap-2 border border-primary bg-primary/10 px-8 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-button"
              >
                Browse Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services?category=Penetration+Testing"
                className="flex h-12 items-center justify-center border border-accent/40 px-8 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Pentest Services
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden border border-primary/20 bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt="Cybersecurity operations center with code on screens"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            <div className="absolute inset-0 scanline" />
            {/* Terminal overlay */}
            <div className="absolute bottom-4 left-4 right-4 border border-primary/20 bg-background/90 p-3 backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-border pb-2">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                <span className="h-2 w-2 rounded-full bg-warning" />
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="ml-2 font-mono text-2xs text-foreground/40">nexus@sec:~$</span>
              </div>
              <p className="mt-2 font-mono text-2xs text-primary/80">
                $ initiating authorized assessment...
              </p>
              <p className="font-mono text-2xs text-foreground/40">
                &gt; scope: confirmed | auth: verified | status: ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container-page grid grid-cols-2 gap-px border-border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background px-6 py-8 text-center">
              <p className="font-mono text-3xl font-bold text-primary glow-text">{stat.value}</p>
              <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-foreground/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="container-page mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
              // Featured
            </p>
            <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
              Top Requested Services
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-page mt-20">
        <div className="text-center">
          <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
            // Why NEXUS//SEC
          </p>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Built on Authorization and Trust
          </h2>
        </div>
        <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-background p-7">
              <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 font-mono text-sm font-bold uppercase tracking-widest text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/50">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-page mt-20">
        <div className="text-center">
          <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
            // Engagement Process
          </p>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            How It Works
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="border border-border p-6 transition-colors hover:border-primary/30">
              <span className="font-mono text-3xl font-bold text-primary/20">{step.num}</span>
              <h3 className="mt-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/50">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-20">
        <div className="text-center">
          <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
            // Service Categories
          </p>
          <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Full Service Catalog
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/services?category=${encodeURIComponent(cat)}`}
              className="border border-border px-4 py-2 font-mono text-xs text-foreground/60 transition-all hover:border-primary hover:text-primary"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Authorization banner */}
      <section className="container-page mt-20">
        <div className="border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <Shield className="mx-auto h-10 w-10 text-primary" strokeWidth={1.5} />
          <h2 className="mt-4 font-mono text-2xl font-bold text-primary glow-text">
            Authorization Required for All Engagements
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-mono text-sm leading-relaxed text-foreground/60">
            Testing is performed only with explicit authorization from the system
            owner. Unauthorized access or testing is not permitted. Every
            engagement begins with a signed scope and authorization letter.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 font-mono text-2xs uppercase tracking-widest text-foreground/50">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Written Authorization
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Defined Scope
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Confidential Reporting
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
