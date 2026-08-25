'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useCallback,
} from 'react';
import type { CartItem, Product } from '@/lib/types';

interface StoreState {
  cart: CartItem[];
  cartOpen: boolean;
}

type StoreAction =
  | { type: 'HYDRATE'; payload: Partial<StoreState> }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean };

const STORAGE_KEY = 'nexus-sec-cart-v1';

function reducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };
    case 'ADD_TO_CART': {
      const incoming = action.payload;
      const existing = state.cart.find((c) => c.productId === incoming.productId);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.productId === incoming.productId
              ? { ...c, quantity: c.quantity + incoming.quantity }
              : c,
          ),
        };
      }
      return { ...state, cart: [...state.cart, incoming] };
    }
    case 'UPDATE_QTY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((c) => c.productId !== productId),
        };
      }
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.productId === productId ? { ...c, quantity } : c,
        ),
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c) => c.productId !== action.payload.productId),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_CART_OPEN':
      return { ...state, cartOpen: action.payload };
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  subtotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    cartOpen: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: 'HYDRATE', payload: { cart: parsed.cart ?? [] } });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: state.cart }));
  }, [state.cart, hydrated]);

  useEffect(() => {
    document.body.style.overflow = state.cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.cartOpen]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        quantity,
        slug: product.slug,
      },
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openCart = useCallback(() => dispatch({ type: 'SET_CART_OPEN', payload: true }), []);
  const closeCart = useCallback(() => dispatch({ type: 'SET_CART_OPEN', payload: false }), []);

  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    [state.cart],
  );

  const subtotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.cart],
  );

  const value: StoreContextValue = {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    cartCount,
    subtotal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
