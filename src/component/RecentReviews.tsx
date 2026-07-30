import { reviews } from '../helper/data'
import ReviewCard from '../card/ReviewCard'

export default function RecentReviews() {
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

        {reviews.map(review => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}

      </div>

    </div>
  )
}
