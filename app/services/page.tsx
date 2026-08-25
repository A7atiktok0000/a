'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Check, Search, Terminal } from 'lucide-react';
import { products, categories, formatPrice } from '@/lib/data';
import { ProductCard } from '@/components/store/product-card';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Name: A → Z' },
];

const priceRanges = [
  { id: '150-500', label: '$150 – $500', min: 150, max: 500 },
  { id: '500-1000', label: '$500 – $1,000', min: 500, max: 1000 },
  { id: '1000-2000', label: '$1,000 – $2,000', min: 1000, max: 2000 },
  { id: '2000+', label: '$2,000+', min: 2000, max: Infinity },
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? '';
  const queryParam = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(queryParam);
  const [sort, setSort] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : [],
  );
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(queryParam);
    setSelectedCategories(categoryParam ? [categoryParam] : []);
  }, [queryParam, categoryParam]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedPrices.length > 0) {
      const ranges = priceRanges.filter((r) => selectedPrices.includes(r.id));
      list = list.filter((p) =>
        ranges.some((r) => p.price >= r.min && p.price < r.max),
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [query, sort, selectedCategories, selectedPrices]);

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function togglePrice(id: string) {
    setSelectedPrices((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setQuery('');
  }

  const activeFilterCount =
    selectedCategories.length + selectedPrices.length + (query ? 1 : 0);

  const FiltersPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
          // Search
        </h3>
        <div className="mt-3 flex items-center gap-2 border border-border bg-background px-3">
          <Search className="h-4 w-4 text-foreground/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="h-10 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-foreground/30"
          />
        </div>
      </div>

      <div>
        <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
          // Category
        </h3>
        <ul className="mt-3 space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-2.5 font-mono text-xs text-foreground/70 hover:text-primary"
              >
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center border',
                    selectedCategories.includes(cat)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border',
                  )}
                >
                  {selectedCategories.includes(cat) && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-2xs uppercase tracking-widest text-primary/70">
          // Price
        </h3>
        <ul className="mt-3 space-y-2">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <button
                onClick={() => togglePrice(range.id)}
                className="flex items-center gap-2.5 font-mono text-xs text-foreground/70 hover:text-primary"
              >
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center border',
                    selectedPrices.includes(range.id)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border',
                  )}
                >
                  {selectedPrices.includes(range.id) && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="font-mono text-2xs uppercase tracking-widest text-foreground/50 underline-offset-4 hover:text-primary hover:underline"
        >
          // Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-page py-10 lg:py-14">
      {/* Header */}
      <div className="border-b border-primary/20 pb-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <p className="font-mono text-2xs uppercase tracking-widest text-primary/70">
            // Service Catalog
          </p>
        </div>
        <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          {query ? (
            <>Results: <span className="text-primary">"{query}"</span></>
          ) : selectedCategories.length === 1 ? (
            selectedCategories[0]
          ) : (
            <>All <span className="text-primary">Services</span></>
          )}
        </h1>
        <p className="mt-2 font-mono text-xs text-foreground/50">
          {filtered.length} {filtered.length === 1 ? 'service' : 'services'} available
        </p>
      </div>

      <div className="mt-8 flex gap-10">
        {/* Desktop filters */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">
            <h2 className="mb-5 font-mono text-2xs uppercase tracking-widest text-primary/70">
              // Filters
            </h2>
            {FiltersPanel}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 border border-border px-4 py-2 font-mono text-2xs uppercase tracking-widest text-foreground/70 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center bg-primary px-1 font-mono text-2xs font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <p className="hidden font-mono text-2xs text-foreground/40 lg:block">
              Showing {filtered.length} services
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-mono text-2xs uppercase tracking-widest text-foreground/40">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 border border-border bg-background px-3 font-mono text-xs outline-none focus:border-primary"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Terminal className="h-12 w-12 text-foreground/20" />
              <p className="mt-4 font-mono text-lg text-foreground/80">No services found</p>
              <p className="mt-2 font-mono text-xs text-foreground/50">
                Adjust your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 border border-primary px-6 py-2 font-mono text-2xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] animate-slide-up overflow-y-auto border-t border-primary/20 bg-background-elevated p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-primary">
                Filters
              </h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-foreground/60"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6">{FiltersPanel}</div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 h-12 w-full border border-primary bg-primary/10 font-mono text-xs font-bold uppercase tracking-widest text-primary"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 font-mono text-sm text-foreground/50">Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
