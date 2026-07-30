import React from 'react'
import OrderCard from '../card/OrderCard'
import { recentOrders } from '../helper/data'

export default function RecentOrders() {
  return (
   <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="font-medium text-xl mb-5">
        Recent Orders
    </h2>

    {recentOrders.map(order => (
        <OrderCard
            key={order.id}
            order={order}
            
        />
    ))}
</div>
  )
}
