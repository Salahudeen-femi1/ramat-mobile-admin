
import RecentOrders from '../component/RecentOrders'
import RecentReviews from '../component/RecentReviews'
import RevenueChart from '../component/RevenueChart'
import StatusDistribution from '../component/StatusDistribution'
import { dashboardData } from '../helper/data'

export default function Overview() {
  return (
    <>
      <div className='grid grid-cols-4 gap-3'>
        {
          dashboardData.map((data) => (
            <div className=' bg-white shadow border border-gray-100 rounded-lg px-4 py-7'>
              <p className='text-sm text-gray-500'>{data.label}</p>
              <p className='text-'>{data.value}</p>
            </div>
          ))
        }

      </div>

      <div className="grid grid-cols-12 gap-5 mt-10">

        {/* LEFT */}
        <div className="col-span-8 space-y-5">

          <RevenueChart />

          <div className="grid grid-cols-2 gap-5">

            <StatusDistribution />

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
