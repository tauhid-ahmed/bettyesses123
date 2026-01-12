"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OrderItemViewModel } from "./OrderList";
import Tooltip from "./Tooltip";


export default function OrderCard({ order }: { order: OrderItemViewModel }) {
  const router = useRouter();

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
            <p className="text-green-600 font-semibold">{order.status}</p>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-2xl font-bold">€ {order.price}</span>

            <div className="flex gap-3">
              <Tooltip text="User can cancel an order within 24 hours">
                <button className="border px-4 py-2 rounded-lg">
                  Cancel Order
                </button>
              </Tooltip>

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
