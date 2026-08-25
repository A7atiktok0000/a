'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { useStore } from '@/components/store/store-provider';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, openCart } = useStore();
  const [hovered, setHovered] = useState(false);

  function handleQuickAdd() {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
    openCart();
  }

  return (
    <div
      className="group relative flex flex-col border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:glow-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/services/${product.slug}`} className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={cn(
            'h-full w-full object-cover opacity-70 transition-all duration-500',
            hovered && 'scale-105 opacity-90',
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {/* Category tag */}
        <div className="absolute left-3 top-3 border border-primary/30 bg-background/80 px-2.5 py-1 font-mono text-2xs uppercase tracking-widest text-primary backdrop-blur">
          {product.category}
        </div>
        {product.featured && (
          <div className="absolute right-3 top-3 border border-accent/30 bg-background/80 px-2.5 py-1 font-mono text-2xs uppercase tracking-widest text-accent backdrop-blur">
            Featured
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/services/${product.slug}`}>
          <h3 className="font-mono text-base font-bold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 font-mono text-xs leading-relaxed text-foreground/50">
          {product.description}
        </p>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3 font-mono text-2xs uppercase tracking-widest text-foreground/40">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {product.estimatedTime}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> Authorized
          </span>
        </div>

        {/* Price + add */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="font-mono text-lg font-bold text-primary glow-text">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleQuickAdd}
            className="flex h-9 items-center gap-1.5 border border-primary/40 bg-primary/5 px-3 font-mono text-2xs uppercase tracking-widest text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
