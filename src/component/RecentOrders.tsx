import React from 'react'
import OrderCard from '../card/OrderCard'
import { recentOrders, registrations } from '../helper/data'
import RegistrationCard from '../card/RegistrationCard'

export default function RecentOrders() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="font-medium text-lg mb-4">
                    Recent Orders
                </h2>
                <div className="space-y-3 overflow-y-auto max-h-[210px] styled-scrollbar">
                    {recentOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}

                        />
                    ))}

                </div>
                <div className="mt-5">

                    <h2 className="font-medium text-lg mb-5">
                        New Registrations
                    </h2>

                    <div className="space-y-3 overflow-y-auto max-h-[200px] styled-scrollbar">
                        {registrations.map(customer => (
                            <RegistrationCard
                                key={customer.id}
                                customer={customer}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
