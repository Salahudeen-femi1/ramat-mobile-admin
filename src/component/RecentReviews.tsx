import ReviewCard from '../card/ReviewCard'
import { useStats } from '../service/helper'

export default function RecentReviews() {

  const { recentReviews } = useStats()

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex justify-between mb-5">
        <h2 className="font-medium text-">
          Recent Reviews
        </h2>

        <button className="text-green-700">
          View All
        </button>
      </div>

      <div className="space-y-5">

        {recentReviews.map(review => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}

      </div>

    </div>
  )
}
