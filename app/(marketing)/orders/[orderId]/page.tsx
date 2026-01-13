import { X } from "lucide-react";
import { getOrderById } from "@/features/orders/actions/get-order-by-id";
import { OrderItemViewModel, OrderStatus } from "../_components/OrderList";
import OrderStepper from "../_components/ProgressStep";
import Link from "next/link"; 

export default async function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;

  // Fetch single order by ID
  const response = await getOrderById(orderId);
  console.log("Order Details Response for ID:", orderId, response);
  
  const apiOrder = response.success ? response.data : null;

  if (!apiOrder || !response.success) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">Order not found</h2>
        <p className="text-gray-500 mt-2">{response?.message || "Check the order ID or your connection."}</p>
        <Link href="/orders" className="text-blue-600 hover:underline mt-4 inline-block">Back to My Orders</Link>
      </div>
    );
  }

  // Map to ViewModel
  const item = apiOrder.orderItems?.[0]; 
  const book = item?.book;
  const template = book?.template;

  const order: OrderItemViewModel = {
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

  const isErrorStatus = order.status === "PAYMENT_FAILED" || order.status === "CANCELLED";

  return (
    <div className="py-12 flex justify-center">
      <div className="w-full max-w-5xl px-4">
        {/* Header */}
     <div className="flex justify-between items-start mb-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E1E]">My Order</h1>
            <p className="text-gray-500 mt-1">Review your item & proceed to checkout whenever you're ready.</p>
        </div>
       <Link
         href="/orders"
         className="cursor-pointer rounded-full p-2
             border border-red-800
             text-gray-500
             hover:bg-gray-100
             hover:text-gray-800
             transition">
          <X size={22} />
       </Link>
     </div>

        {/* Order Details Card */}
        <div className="w-full bg-[#F4F7FF] border border-[#8B7BFF] rounded-3xl p-6 md:p-10 mb-16 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
               {/* Image */}
                <div className="w-full md:w-48 h-48 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden">
                    <img src={order.image} className="w-full h-full object-cover" alt={order.title} />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-semibold text-[#1E1E1E]">{order.title}</h2>
                    <div className="text-gray-600 space-y-1">
                        <p><span className="font-medium text-gray-500">Name:</span> <span className="text-gray-800 font-medium">{order.name}</span> <span className="ml-4 font-medium text-gray-500">Age:</span><span className="text-gray-800 font-medium">{order.age}</span></p>
                        <p><span className="font-medium text-gray-500">Order Date:</span> <span className="text-gray-800 font-medium">{order.orderDate}</span></p>
                        <p><span className="font-medium text-gray-500">Order ID:</span> <span className="text-gray-800 font-medium">#{order.orderId}</span></p>
                        <p><span className="font-medium text-gray-500">Status:</span> <span className={`font-semibold ${isErrorStatus ? "text-red-500" : "text-green-600"}`}>{order.status}</span></p>
                    </div>
                    <div className="pt-4">
                        <p className="text-3xl font-bold text-[#1E1E1E]">€ {order.price}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Order Progress */}
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-12 text-[#1E1E1E]">Order progress</h2>
            <OrderStepper status={order.status} />
        </div>
      </div>
    </div>
  );
}
