'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingBag,
  Shield,
  Clock,
  CheckCircle2,
  FileText,
  Package,
  AlertTriangle,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useStore } from '@/components/store/store-provider';
import { ProductCard } from '@/components/store/product-card';
import { cn } from '@/lib/utils';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const { addToCart, openCart } = useStore();
  const [openSection, setOpenSection] = useState<string | null>('scope');

  function handleAddToCart() {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
    openCart();
  }

  function handleBuyNow() {
    addToCart(product, 1);
    window.location.href = '/cart';
  }

  const sections = [
    { id: 'scope', label: 'Scope', icon: Package, content: product.scope },
    {
      id: 'included',
      label: "What's Included",
      icon: CheckCircle2,
      content: (
        <ul className="space-y-2">
          {product.included.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'deliverables',
      label: 'Deliverables',
      icon: FileText,
      content: (
        <ul className="space-y-2">
          {product.deliverables.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'requirements',
      label: 'Requirements',
      icon: AlertTriangle,
      content: (
        <ul className="space-y-2">
          {product.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden border border-primary/20 bg-background scanline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute left-4 top-4 border border-primary/30 bg-background/80 px-3 py-1.5 font-mono text-2xs uppercase tracking-widest text-primary backdrop-blur">
            {product.category}
          </div>
          {product.featured && (
            <div className="absolute right-4 top-4 border border-accent/30 bg-background/80 px-3 py-1.5 font-mono text-2xs uppercase tracking-widest text-accent backdrop-blur">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:py-2">
          <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
            // {product.category}
          </p>
          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono text-3xl font-bold text-primary glow-text">
              {formatPrice(product.price)}
            </span>
            <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
              per engagement
            </span>
          </div>

          <p className="mt-5 font-mono text-sm leading-relaxed text-foreground/60">
            {product.description}
          </p>

          {/* Meta */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 border border-border p-3">
              <Clock className="h-4 w-4 text-accent" />
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-foreground/40">Timeline</p>
                <p className="font-mono text-xs text-foreground">{product.estimatedTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-border p-3">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <p className="font-mono text-2xs uppercase tracking-widest text-foreground/40">Authorization</p>
                <p className="font-mono text-xs text-foreground">Required</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-2 border border-primary bg-primary/10 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-button"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex h-12 flex-1 items-center justify-center gap-2 border border-accent/40 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </button>
          </div>

          {/* Authorization notice */}
          <div className="mt-5 border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="font-mono text-2xs leading-relaxed text-foreground/60">
                <span className="font-bold text-primary">Authorization Required:</span>{' '}
                {product.authorization}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details sections */}
      <section className="mt-16 lg:mt-20">
        <h2 className="font-mono text-xl font-bold tracking-tight">
          <span className="text-primary">//</span> Service Details
        </h2>
        <div className="mt-6 border-t border-border">
          {sections.map((section) => {
            const open = openSection === section.id;
            return (
              <div key={section.id} className="border-b border-border">
                <button
                  onClick={() => setOpenSection(open ? null : section.id)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-widest text-foreground">
                    <section.icon className="h-4 w-4 text-primary" />
                    {section.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-foreground/40 transition-transform duration-300',
                      open && 'rotate-180 text-primary',
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="font-mono text-sm leading-relaxed text-foreground/60">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 lg:mt-20">
          <h2 className="font-mono text-xl font-bold tracking-tight">
            <span className="text-primary">//</span> Related Services
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky add bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-primary/20 bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex flex-col">
          <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
            {product.name}
          </span>
          <span className="font-mono text-base font-bold text-primary">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex h-11 items-center justify-center gap-2 border border-primary bg-primary/10 px-6 font-mono text-2xs font-bold uppercase tracking-widest text-primary"
        >
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </>
  );
}
