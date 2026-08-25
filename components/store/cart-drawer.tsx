'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Shield } from 'lucide-react';
import { useStore } from '@/components/store/store-provider';
import { formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';

const SERVICE_FEE_RATE = 0.05;

export function CartDrawer() {
  const { cart, cartOpen, closeCart, updateQuantity, removeFromCart, subtotal, cartCount } =
    useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (cartOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const total = subtotal + serviceFee;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeCart}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in-right flex-col border-l border-primary/20 bg-background-elevated shadow-2xl"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/20 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-primary" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-primary">
              Cart
            </h2>
            <span className="font-mono text-xs text-foreground/50">[{cartCount}]</span>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center text-foreground/60 hover:text-primary"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center border border-primary/20">
              <ShoppingBag className="h-7 w-7 text-primary/40" />
            </div>
            <p className="mt-5 font-mono text-lg text-foreground/80">Cart is empty</p>
            <p className="mt-2 font-mono text-xs text-foreground/50">
              No services selected yet.
            </p>
            <Link
              href="/services"
              onClick={closeCart}
              className="mt-6 inline-flex h-11 items-center justify-center border border-primary bg-primary/10 px-8 font-mono text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-button"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.productId}
                    className="flex gap-4 border border-border p-3"
                  >
                    <Link
                      href={`/services/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden border border-primary/20 bg-background"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover opacity-80"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/services/${item.slug}`}
                          onClick={closeCart}
                          className="font-mono text-sm font-medium text-foreground hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-foreground/40 hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 font-mono text-2xs uppercase tracking-widest text-foreground/40">
                        {item.category}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-primary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center font-mono text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-foreground/60 hover:text-primary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-bold text-primary">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-primary/20 px-5 py-4">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Service fee (5%)</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-primary">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-4 flex h-12 items-center justify-center gap-2 border border-primary bg-primary/10 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-button"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/services"
                onClick={closeCart}
                className="mt-2 flex h-11 items-center justify-center border border-border font-mono text-2xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-primary"
              >
                Continue Browsing
              </Link>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <Shield className="h-3 w-3 text-primary/60" />
                <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
                  Authorized testing only
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
