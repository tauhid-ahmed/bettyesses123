"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OrderItemViewModel } from "./OrderList";
import Tooltip from "./Tooltip";
import { useTransition } from "react";
import { cancelOrder } from "@/features/orders/actions/cancel-order";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OrderCard({ order }: { order: OrderItemViewModel }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCancelOrder = async () => {
    startTransition(async () => {
      try {
        const res = await cancelOrder(order.id);
        if (res.success) {
          toast.success("Order cancelled successfully");
        } else {
          toast.error(res.message || "Failed to cancel order");
        }
      } catch (error) {
        toast.error("An error occurred while cancelling the order");
      }
    });
  };

  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="bg-primary-100 rounded-2xl border border-primary-500 p-6">
      <div className="flex gap-6">
        <img
          src={order.image}
          className="w-28 h-36 rounded-xl object-cover"
        />

        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">{order.title}</h3>

          <div className="text-sm space-y-1">
            <p>Name: {order.name} | Age: {order.age}</p>
            <p>Order Date: {order.orderDate}</p>
            <p>Order ID: #{order.orderId}</p>
            <p className={isCancelled ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
              {order.status}
            </p>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-2xl font-bold">€ {order.price}</span>

            <div className="flex gap-3">
              {!isCancelled && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      disabled={isPending}
                      className="border px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      {isPending ? "Cancelling..." : "Cancel Order"}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently cancel your order.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleCancelOrder}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Yes, Cancel Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                onClick={() =>
                  router.push(`/orders/${order.id}`)
                }
              >
                Track Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
