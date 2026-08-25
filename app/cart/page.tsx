'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ShoppingBag, Shield, Lock, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useStore } from '@/components/store/store-provider';
import { formatPrice } from '@/lib/data';

const SERVICE_FEE_RATE = 0.05;

export default function CartPage() {
  const router = useRouter();
  const { cart, subtotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const [placing, setPlacing] = useState(false);

  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const total = subtotal + serviceFee;

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      clearCart();
      toast.success('Order submitted. We will contact you to confirm authorization.');
      router.push('/services');
    }, 1200);
  }

  if (cart.length === 0) {
    return (
      <div className="container-page flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center border border-primary/20">
          <ShoppingBag className="h-9 w-9 text-primary/40" />
        </div>
        <h1 className="mt-6 font-mono text-2xl font-bold text-foreground/80">
          Cart is empty
        </h1>
        <p className="mt-3 max-w-sm font-mono text-xs text-foreground/50">
          No services selected yet. Browse the catalog to find an authorized
          security assessment for your needs.
        </p>
        <Link
          href="/services"
          className="mt-7 inline-flex h-12 items-center justify-center border border-primary bg-primary/10 px-8 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-button"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-primary">//</span> Cart
      </h1>
      <p className="mt-2 font-mono text-xs text-foreground/50">
        {cart.reduce((s, i) => s + i.quantity, 0)} services in your cart
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div>
          <ul className="divide-y divide-border border-t border-b border-border">
            {cart.map((item) => (
              <li key={item.productId} className="flex gap-4 py-6">
                <Link
                  href={`/services/${item.slug}`}
                  className="relative h-24 w-28 shrink-0 overflow-hidden border border-primary/20 bg-background"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover opacity-70" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/services/${item.slug}`}
                        className="font-mono text-sm font-bold text-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 font-mono text-2xs uppercase tracking-widest text-foreground/40">
                        {item.category}
                      </p>
                    </div>
                    <span className="font-mono text-base font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-foreground/60 hover:text-primary"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-foreground/60 hover:text-primary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-foreground/40 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <Link
              href="/services"
              className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-foreground/50 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Continue Browsing
            </Link>
            <button
              onClick={clearCart}
              className="font-mono text-2xs uppercase tracking-widest text-foreground/40 hover:text-destructive"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <form onSubmit={handleCheckout} className="border border-primary/20 bg-card p-6">
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-primary">
              Order Summary
            </h2>
            <dl className="mt-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <dt className="text-foreground/50">Subtotal</dt>
                <dd className="text-foreground">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground/50">Service fee (5%)</dt>
                <dd className="text-foreground">{formatPrice(serviceFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                <dt className="text-primary">Total</dt>
                <dd className="text-primary glow-text">{formatPrice(total)}</dd>
              </div>
            </dl>

            {/* Authorization notice */}
            <div className="mt-5 border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-start gap-2">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <p className="font-mono text-2xs leading-relaxed text-foreground/50">
                  All services require written authorization from the system
                  owner before testing begins.
                </p>
              </div>
            </div>

            {/* Contact fields */}
            <div className="mt-5 space-y-3">
              <label className="block">
                <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
                  Contact Email *
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1.5 h-11 w-full border border-border bg-background px-3 font-mono text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
                  Organization *
                </span>
                <input
                  type="text"
                  required
                  placeholder="Company / Entity name"
                  className="mt-1.5 h-11 w-full border border-border bg-background px-3 font-mono text-sm outline-none focus:border-primary"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 border border-primary bg-primary/10 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50 glow-button"
            >
              {placing ? (
                'Submitting...'
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Submit Request
                </>
              )}
            </button>
            <p className="mt-3 text-center font-mono text-2xs uppercase tracking-widest text-foreground/40">
              We will contact you to verify authorization
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}
