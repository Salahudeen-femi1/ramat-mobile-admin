
import { useEffect } from 'react'
import StatCard from '../card/StatCard'
import RecentOrders from '../component/RecentOrders'
import RecentReviews from '../component/RecentReviews'
import RevenueChart from '../component/RevenueChart'
import { useStats } from '../service/helper'
import { toast } from 'sonner'

export default function Overview() {

  const { metrics, weeklyChart, recentReviews, isLoading, isError: metricsError, } = useStats()

  useEffect(() => {
    if (metricsError) {
      const message = (metricsError as any).response?.data?.message || "An error occurred while fetching customers.";

      toast.error(message);
    }
  }, [metricsError])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-sm">Loading metrics...</p>
      </div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-4 gap-3'>
        <StatCard title='Orders Today'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.ordersToday ?? 0}
          </div>
        </StatCard>
        <StatCard title='Active Orders'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.activeOrders ?? 0}
          </div>
        </StatCard>
        <StatCard title='Ready for Pickup'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.readyForPickup ?? 0}
          </div>
        </StatCard>
        <StatCard title='Completed Orders'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.completedOrders ?? 0}
          </div>
        </StatCard>
        <StatCard title='Revene Today'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.revenueTodayFormatted ?? "₦0"}
          </div>
        </StatCard>
        <StatCard title='Monthly Revene'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.monthlyRevenueFormatted ?? "₦0"}
          </div>
        </StatCard>
        <StatCard title='Total Customers'>
          <div className="mt-1 text-[20px] font-bold">
            {metrics?.totalCustomers ?? 0}
          </div>
        </StatCard>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-10">

        {/* LEFT */}
        <div className="col-span-8 space-y-5">

          <RevenueChart data={weeklyChart} />

          <div className="">
            <RecentReviews />

          </div>

        </div>

        {/* RIGHT */}
        <div className="col-span-4">

          <RecentOrders />

        </div>

      </div>
    </>
  )
}
