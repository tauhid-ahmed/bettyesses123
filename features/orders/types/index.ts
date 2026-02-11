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
  photoUrl: string;
  aiGeneratedPhotoUrl: string | null;
  template: Template;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  price: number;
  format: string;
  createdAt: string;
  updatedAt: string;
  book: Book;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: string;
  email: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  subtotal: number;
  discountAmount: number;
  total: number;
  promocodeId: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  promocode: any;
  payment: any;
  user?: User;
}

export interface OrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Order;
}

export interface MyOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Order[];
}
