import { getMyOrders } from "@/features/orders/actions/get-my-orders";
import OrderCard from "./OrderCard";

export type OrderStatus = "Processed" | "Shipped" | "En Route" | "Arrived" | "COMPLETED" | "PENDING" | "CANCELLED";

export interface OrderItemViewModel {
  id: string; 
  title: string;
  name: string;
  age: number;
  image: string;
  price: number;
  orderDate: string;
  orderId: string; 
  status: OrderStatus;
}

export default async function OrderList() {
  const response = await getMyOrders();
  console.log(response);
  console.log("OrderList Response:", JSON.stringify(response, null, 2)); // improved logging

  if (!response.success) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500 font-bold">Failed to load orders: {response.message}</p>
        <p className="text-sm text-gray-500">Status Code: {response.statusCode}</p>
      </div>
    );
  }

  const apiOrders = response.data || [];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-3">
        <h1 className="text-3xl font-bold mb-6">My Order</h1>

        <div className="space-y-6">
          {apiOrders.length > 0 ? (
            apiOrders.map((apiOrder) => {
              const item = apiOrder.orderItems?.[0]; 
              const book = item?.book;
              const template = book?.template;

              const viewModel: OrderItemViewModel = {
                id: apiOrder.id,
                title: template?.title || "Custom Book",
                name: book?.childName || apiOrder.firstName,
                age: book?.age || 0,
                image: template?.coverImage || template?.thumbnails?.[0] || "https://placehold.co/400x400?text=No+Image",
                price: apiOrder.total,
                orderDate: apiOrder.createdAt ? new Date(apiOrder.createdAt).toLocaleDateString() : "N/A",
                orderId: apiOrder.orderNumber,
                status: apiOrder.status as OrderStatus,
              };

              return <OrderCard key={apiOrder.id} order={viewModel} />;
            })
          ) : (
             <p className="text-gray-500 text-center">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
