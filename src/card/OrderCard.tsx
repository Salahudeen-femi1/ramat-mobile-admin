import React from "react";
import type { OrderProps } from "../helper/types";

interface Props {
  order: OrderProps;
}

const statusColor = {
  Ready: "bg-green-100 text-green-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Pending: "bg-gray-100 text-gray-600",
};

export default function OrderCard({ order }: Props) {
  return (
    <div className="flex items-start justify-between px-4 py-3 border-b border-gray-100 last:border-none">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
          {order.icon}
        </div>

        <div>
          <h3 className="font-medium text-sm">{order.id}</h3>

          <p className="text-gray-500 text-[12px] ">
            {order.items} Items
          </p>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[order.status]}`}
        >
          {order.status}
        </span>

        <p className="text-gray-500 text-sm mt-2">
          {order.time}
        </p>
      </div>
    </div>
  );
}