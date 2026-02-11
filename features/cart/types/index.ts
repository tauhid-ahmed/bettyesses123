export interface Template {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  category: string;
  coverImage: string;
  thumbnails: string[];
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  userId: string;
  templateId: string;
  childName: string;
  age: number;
  gender: string;
  birthMonth: string;
  photoUrl: string | null;
  aiGeneratedPhotoUrl: string | null;
  template: Template;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCartItem {
  id: string;
  cartId: string;
  bookId: string;
  format: string;
  createdAt: string;
  updatedAt: string;
  book: Book;
}

export interface ApiCart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: ApiCartItem[];
}

export interface CartData {
  cart: ApiCart;
  subtotal: number;
  itemCount: number;
}

export interface CartResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CartData;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  childName?: string;
  age?: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  itemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
}
