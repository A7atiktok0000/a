export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  scope: string;
  included: string[];
  deliverables: string[];
  estimatedTime: string;
  requirements: string[];
  authorization: string;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  slug: string;
}
