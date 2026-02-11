export type BookOrder = {
  id: number;
  orderId: string; // Add orderId to pass to BookDetailsPage
  image: string;
  count: number;
  title: string;
  name: string;
  age: number;
  orderDate: string;
  status: string;
  price: string;
};
