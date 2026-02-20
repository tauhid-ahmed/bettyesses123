export type UserLocation = {
  address: string;
  city: string;
  zipcode: string;
} | null;

export type OrderItem = {
  id: string;
  orderId: string;
  bookId: string;
  price: number;
  format: string;
  createdAt: string;
  updatedAt: string;
  book: {
    id: string;
    userId: string;
    templateId: string;
    childName: string;
    age: number;
    gender: string;
    birthMonth: string;
    photoUrl: string | null;
    aiGeneratedPhotoUrl: string | null;
    template: {
      id: string;
      title: string;
      description: string;
      ageRange: string;
      category: string;
      coverImage: string;
      price: number;
    };
  };
};

export type Order = {
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
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

export type UserDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
  role: "ADMIN" | "USER" | "SUPERADMIN";
  status: string;
  location: UserLocation;
  phoneNumber: string | null;
  suspendedUntil: string | null;
  suspensionNote: string | null;
  createdAt: string;
  updatedAt: string;
  ongoingOrders: Order[];
  pastOrders: Order[];
  totalSpent: number;
};
