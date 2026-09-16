import { useEffect } from 'react'
import OrderCard from '../card/OrderCard'
import RegistrationCard from '../card/RegistrationCard'
import { useStats } from '../service/helper'
import { toast } from 'sonner'

export default function RecentOrders() {

    const { recentOrders, newRegistrations, isLoading, isError: error } = useStats()

    useEffect(() => {
        if (error) {
            const message = (error as any).response?.data?.message || "An error occurred while fetching customers.";

            toast.error(message);
        }
    }, [error])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        )
    }

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
                        {newRegistrations.map(customer => (
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
