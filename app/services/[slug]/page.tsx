import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { products, getProductBySlug, getRelatedProducts } from '@/lib/data';
import { ProductDetailClient } from './product-detail-client';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  return (
    <div className="container-page py-8 lg:py-12">
      <nav className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-widest text-foreground/40">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/services" className="hover:text-primary">Services</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-primary">{product.name}</span>
      </nav>

      <ProductDetailClient product={product} related={related} />
    </div>
  );
}
