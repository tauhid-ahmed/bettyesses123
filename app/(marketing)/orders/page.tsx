import OrderList from "./_components/OrderList";

export default function OrdersPage() {
  return <OrderList />;
}














// "use client";
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import {
//   ShoppingBag,
//   Package,
//   Truck,
//   CheckCircle,
//   X,
//   Calendar,
//   Hash,
//   User,
//   Mail,
//   Phone,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// // ==================== TYPES ====================
// type OrderStatus = "Processed" | "Shipped" | "En Route" | "Arrived";

// interface OrderItem {
//   id: string;
//   title: string;
//   name: string;
//   age: number;
//   image: string;
//   price: number;
//   orderDate: string;
//   orderId: string;
//   status: OrderStatus;
// }

// interface OrderContextType {
//   orders: OrderItem[];
//   selectedOrder: OrderItem | null;
//   setSelectedOrder: (order: OrderItem | null) => void;
//   cancelOrder: (orderId: string) => void;
//   getOrderProgress: (status: OrderStatus) => number;
// }

// // ==================== CONTEXT ====================
// const OrderContext = createContext<OrderContextType | undefined>(undefined);

// const useOrders = (): OrderContextType => {
//   const context = useContext(OrderContext);
//   if (!context) {
//     throw new Error("useOrders must be used within OrderProvider");
//   }
//   return context;
// };

// // ==================== MOCK DATA ====================
// const mockOrders: OrderItem[] = [
//   {
//     id: "1",
//     title: "The adventure of Rakib to the amazon jungle",
//     name: "Rakib",
//     age: 11,
//     image:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
//     price: 30.0,
//     orderDate: "10-12-2025",
//     orderId: "#3472234",
//     status: "Shipped",
//   },
//   {
//     id: "2",
//     title: "The adventure of Rakib to the amazon jungle",
//     name: "Rakib",
//     age: 11,
//     image:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
//     price: 30.0,
//     orderDate: "10-12-2025",
//     orderId: "#3472234",
//     status: "Shipped",
//   },
// ];

// // ==================== PROVIDER ====================
// const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
//   const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

//   const cancelOrder = (orderId: string): void => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order.orderId !== orderId)
//     );
//     if (selectedOrder?.orderId === orderId) {
//       setSelectedOrder(null);
//     }
//   };

//   const getOrderProgress = (status: OrderStatus): number => {
//     const statusMap: Record<OrderStatus, number> = {
//       Processed: 1,
//       Shipped: 2,
//       "En Route": 3,
//       Arrived: 4,
//     };
//     return statusMap[status];
//   };

//   return (
//     <OrderContext.Provider
//       value={{
//         orders,
//         selectedOrder,
//         setSelectedOrder,
//         cancelOrder,
//         getOrderProgress,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // ==================== COMPONENTS ====================

// // Tooltip Component
// interface TooltipProps {
//   children: ReactNode;
//   text: string;
// }

// function Tooltip({ children, text }: TooltipProps) {
//   const [show, setShow] = useState(false);

//   return (
//     <div className="relative inline-block">
//       <div
//         onMouseEnter={() => setShow(true)}
//         onMouseLeave={() => setShow(false)}
//       >
//         {children}
//       </div>
//       {show && (
//         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50">
//           {text}
//           <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
//             <div className="border-4 border-transparent border-t-gray-800"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Order Card Component
// function OrderCard({ order }: { order: OrderItem }) {
//   const { setSelectedOrder, cancelOrder } = useOrders();

//   return (
//     <div className="bg-primary-100 rounded-2xl border border-primary-500 p-6">
//       <div className="flex gap-6">
//         <div className="w-28 h-36 bg-primary-100 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
//           <img
//             src={order.image}
//             alt={order.title}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="flex-1 flex flex-col">
//           <h3 className="text-lg font-semibold text-gray-900 mb-3">
//             {order.title}
//           </h3>

//           <div className="space-y-1 mb-4 text-sm">
//             <div className="text-gray-600">
//               <span className="font-medium text-gray-700">Name:</span>{" "}
//               {order.name}{" "}
//               <span className="ml-4 font-medium text-gray-700">Age:</span>{" "}
//               {order.age}
//             </div>
//             <div className="text-gray-600">
//               <span className="font-medium text-gray-700">Order Date:</span>{" "}
//               {order.orderDate}
//             </div>
//             <div className="text-gray-600">
//               <span className="font-medium text-gray-700">Order ID:</span>{" "}
//               {order.orderId}
//             </div>
//             <div className="text-gray-600">
//               <span className="font-medium text-gray-700">Status:</span>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </div>
//           </div>

//           <div className="mt-auto flex items-end justify-between">
//             <div className="text-2xl font-bold text-gray-900">
//               € {order.price.toFixed(2)}
//             </div>
//             <div className="flex gap-3">
//               <Tooltip text="User can cancel an order in 24 hours after ordering. After that this feature won't be accessible.">
//                 <button
//                   onClick={() => cancelOrder(order.orderId)}
//                   className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
//                 >
//                   Cancel Order
//                 </button>
//               </Tooltip>
//               <Button
//                 onClick={() => setSelectedOrder(order)}
//                 className="primary-gradient"
//                 size="lg"
//               >
//                 Track Order
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Order List Component
// const OrderList: React.FC = () => {
//   const { orders } = useOrders();

//   return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
//       <div className="max-w-7xl mx-auto md:px-3 lg:px-0 px-2">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Order</h1>
//           <p className="text-gray-600">
//             Review your item & proceed to checkout whenever you're ready.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {orders.map((order) => (
//             <OrderCard key={order.id} order={order} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Progress Step Component
// interface ProgressStepProps {
//   icon: ReactNode;
//   label: string;
//   step: number;
//   currentStep: number;
//   isLast?: boolean;
// }

// const ProgressStep: React.FC<ProgressStepProps> = ({
//   icon,
//   label,
//   step,
//   currentStep,
//   isLast = false,
// }) => {
//   const isActive = step <= currentStep;

//   return (
//     <div className="flex flex-col items-center flex-1 relative">
//       <div className="text-xs font-semibold text-gray-500 mb-3">
//         Step {step}
//       </div>
//       <div
//         className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 transition-all shadow-lg ${
//           isActive
//             ? "bg-linear-to-br from-indigo-500 to-purple-600"
//             : "bg-gray-200"
//         }`}
//       >
//         <div className={`text-3xl ${isActive ? "" : "grayscale opacity-50"}`}>
//           {icon}
//         </div>
//       </div>
//       <span
//         className={`text-sm font-semibold text-center ${
//           isActive ? "text-gray-900" : "text-gray-400"
//         }`}
//       >
//         {label}
//       </span>
//       {!isLast && (
//         <div className="absolute top-14 left-1/2 w-full h-1">
//           <div
//             className={`h-full ${
//               step < currentStep
//                 ? "bg-linear-to-r from-indigo-500 to-purple-600"
//                 : "bg-gray-200"
//             }`}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Order Details Component
// const OrderDetails: React.FC = () => {
//   const { selectedOrder, setSelectedOrder, getOrderProgress } = useOrders();

//   if (!selectedOrder) return null;

//   const currentProgress = getOrderProgress(selectedOrder.status);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//       <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//         <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 px-8 py-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900">My Order</h2>
//             <p className="text-gray-600 mt-1">
//               Review your item & proceed to checkout whenever you're ready.
//             </p>
//           </div>
//           <button
//             onClick={() => setSelectedOrder(null)}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-8">
//           {/* Order Summary */}
//           <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-10 border border-indigo-100">
//             <div className="flex gap-6">
//               <div className="w-32 h-40 bg-white rounded-xl overflow-hidden shrink-0 shadow-md">
//                 <img
//                   src={selectedOrder.image}
//                   alt={selectedOrder.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="flex-1 flex flex-col">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">
//                   {selectedOrder.title}
//                 </h3>

//                 <div className="space-y-1.5 mb-4 text-sm">
//                   <div className="text-gray-700">
//                     <span className="font-semibold text-gray-800">Name:</span>{" "}
//                     {selectedOrder.name}{" "}
//                     <span className="ml-6 font-semibold text-gray-800">
//                       Age:
//                     </span>{" "}
//                     {selectedOrder.age}
//                   </div>
//                   <div className="text-gray-700">
//                     <span className="font-semibold text-gray-800">
//                       Order Date:
//                     </span>{" "}
//                     {selectedOrder.orderDate}
//                   </div>
//                   <div className="text-gray-700">
//                     <span className="font-semibold text-gray-800">
//                       Order ID:
//                     </span>{" "}
//                     {selectedOrder.orderId}
//                   </div>
//                   <div className="text-gray-700">
//                     <span className="font-semibold text-gray-800">Status:</span>{" "}
//                     <span className="text-green-600 font-bold">
//                       {selectedOrder.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="text-3xl font-bold text-gray-900 mt-auto">
//                   € {selectedOrder.price.toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Progress Tracker */}
//           <div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-8">
//               Order progress
//             </h3>

//             <div className="flex items-start justify-between relative mb-8 px-10">
//               <ProgressStep
//                 icon="📦"
//                 label="Order Processed"
//                 step={1}
//                 currentStep={currentProgress}
//               />
//               <ProgressStep
//                 icon="📫"
//                 label="Order Shipped"
//                 step={2}
//                 currentStep={currentProgress}
//               />
//               <ProgressStep
//                 icon="🚚"
//                 label="Order En Route"
//                 step={3}
//                 currentStep={currentProgress}
//               />
//               <ProgressStep
//                 icon="🎁"
//                 label="Order Arrived"
//                 step={4}
//                 currentStep={currentProgress}
//                 isLast
//               />
//             </div>

//             <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
//               <p className="text-sm text-blue-900">
//                 <span className="font-semibold">Note:</span> User can cancel an
//                 order in 24 hours after ordering. After that this feature won't
//                 be accessible.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN APP ====================
// const App: React.FC = () => {
//   return (
//     <OrderProvider>
//       <div className="min-h-screen">
//         <OrderList />
//         <OrderDetails />
//       </div>
//     </OrderProvider>
//   );
// };

// export default App;
