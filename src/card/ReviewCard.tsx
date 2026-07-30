import { Star } from "lucide-react";

export interface ReviewProps {
  id: number;
  customer: string;
  rating: number;
  review: string;
}

interface Props {
  review: ReviewProps;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="border border-gray-100 rounded-xl p-2 bg-[#F9FAF6]">
      <div className="flex justify-between items-center">
        <h3 className="font-medium ">
          {review.customer}
        </h3>

        <div className="flex gap-1">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              size={12}
              fill="#FDBA12"
              stroke="#FDBA12"
            />
          ))}
        </div>
      </div>

      <p className="italic text-gray-600 leading-5 text-sm">
        "{review.review}"
      </p>
    </div>
  );
}