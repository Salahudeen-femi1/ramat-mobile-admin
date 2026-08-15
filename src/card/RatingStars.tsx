import { Star } from "lucide-react";

function RatingStars({
    rating,
    size = 13,
}: {
    rating: number;
    size?: number;
}) {
    return (
        <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    size={size}
                    className={
                        index < rating
                            ? "fill-[#f5b942] text-[#f5b942]"
                            : "text-gray-300"
                    }
                />
            ))}
        </div>
    );
}

export default RatingStars;