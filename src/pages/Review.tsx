import { useEffect, useMemo, useState } from "react";
import type { Review } from "../helper/types";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
  Star,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import StatCard from "../card/StatCard";
import RatingStars from "../card/RatingStars";
import { topItems } from "../helper/data";
import { useAverageRating, useRating } from "../service/helper";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function Review() {
  // const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<
    "All Reviews" | "5 Stars" | "Needs Reply"
  >("All Reviews");

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [openReply, setOpenReply] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const { data: average } = useAverageRating()
  const { data: rating, isLoading, error } = useRating()
  const queryClient = useQueryClient();

  const filteredReviews = useMemo(() => {
    return (rating ?? []).filter((review: Review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(search.toLowerCase()) ||
        review.text.toLowerCase().includes(search.toLowerCase()) ||
        review.item.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "5 Stars") {
        return review.rating === 5;
      }

      if (filter === "Needs Reply") {
        return !review.replied;
      }

      return true;
    }) ?? [];
  }, [rating, filter, search]);

  const replyToReview = (id: number) => {
    queryClient.setQueryData<Review[]>(["rating"], (current = []) =>
      current.map((review) =>
        review.id === id
          ? { ...review, replied: true, reply: replyText }
          : review
      )
    );
    setOpenReply(null);
    setReplyText("");
  };

  const markAsReplied = (id: number) => {
    queryClient.setQueryData<Review[]>(["rating"], (current = []) =>
      current.map((review) =>
        review.id === id
          ? { ...review, replied: true }
          : review
      )
    );
  };

  const averageRating = average?.average ?? 0;
  const totalReviews = rating?.length ?? 0;
  const sentiment = useMemo(() => {
    const reviews = rating ?? [];
    const positive = reviews.filter((review) => review.rating >= 4).length;
    const neutral = reviews.filter((review) => review.rating === 3).length;

    if (reviews.length === 0) {
      return { positive: 0, neutral: 0, negative: 0 };
    }

    const positivePercentage = Math.round((positive / reviews.length) * 100);
    const neutralPercentage = Math.round((neutral / reviews.length) * 100);

    return {
      positive: positivePercentage,
      neutral: neutralPercentage,
      negative: 100 - positivePercentage - neutralPercentage,
    };
  }, [rating]);

  useEffect(() => {
    if (rating) {
      toast.success("Successfull fetched ratings and message")
    }

    if (error) {
      const message = (error as any).response?.data?.message || "An error occurred while fetching rating and reviews.";

      toast.error(message);
    }
  }, [rating, error])


  if (isLoading) {
    return <div className="text-xs text-gray-500 text-center flex h-screen flex justify-center items-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-4 font-sans text-[#182230]">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.5px]">
              Reviews Management
            </h1>

            <p className="text-[11px] text-gray-500">
              Monitor and respond to guest feedback.
            </p>
          </div>

          <button
            onClick={() =>
              setDateRange(
                dateRange === "Last 30 Days"
                  ? "Last 7 Days"
                  : dateRange === "Last 7 Days"
                    ? "Last 90 Days"
                    : "Last 30 Days"
              )
            }
            className="flex items-center gap-2 rounded-md border border-[#d9dfe6] bg-white px-3 py-1.5 text-[9px] font-medium text-gray-600"
          >
            {dateRange}
            <ChevronDown size={11} />
          </button>
        </div>

        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_150px_1fr]">
          {/* Average Rating */}
          <StatCard title="Average Rating">
            <div className="mt-1 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-bold">
                    {averageRating}
                  </span>
                  <span className="text-[10px] text-gray-400">/5.0</span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-[8px] text-green-600">
                  <TrendingUp size={9} />
                  <span>0.2 this month</span>
                </div>
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff8f1]">
                <Star
                  size={13}
                  className="fill-[#f4b942] text-[#f4b942]"
                />
              </div>
            </div>
          </StatCard>

          {/* Total Reviews */}
          <StatCard title="Total Reviews">
            <div className="mt-1 flex items-center justify-between">
              <div>
                <p className="text-[20px] font-bold">
                  {totalReviews.toLocaleString()}
                </p>

                <div className="mt-1 flex items-center gap-1 text-[8px] text-green-600">
                  <TrendingUp size={9} />
                  <span>12% vs last month</span>
                </div>
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef8ff]">
                <MessageCircle
                  size={13}
                  className="text-[#1684d8]"
                />
              </div>
            </div>
          </StatCard>

          {/* Sentiment */}
          <StatCard title="Sentiment Breakdown">
            <div className="mt-4">
              <div className="flex h-[5px] overflow-hidden rounded-full">
                <div
                  className="bg-[#1a9c5b]"
                  style={{ width: `${sentiment.positive}%` }}
                />
                <div
                  className="bg-[#e8bd38]"
                  style={{ width: `${sentiment.neutral}%` }}
                />
                <div
                  className="bg-[#d73535]"
                  style={{ width: `${sentiment.negative}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[8px]">
                <span className="text-green-600">
                  ● Positive ({sentiment.positive}%)
                </span>
                <span className="text-yellow-600">
                  ● Neutral ({sentiment.neutral}%)
                </span>
                <span className="text-red-600">
                  ● Negative ({sentiment.negative}%)
                </span>
              </div>
            </div>
          </StatCard>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_300px]">
          {/* LEFT */}
          <div>
            {/* FILTER */}
            <div className="rounded-xl border border-[#dfe4ea] bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[9px] font-medium text-gray-500">
                  Filter by:
                </span>

                {(["All Reviews", "5 Stars", "Needs Reply"] as const).map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-[8px] font-medium ${filter === item
                        ? "bg-[#e8f8ef] text-[#08763b]"
                        : "border border-gray-200 text-gray-600"
                        }`}
                    >
                      {item}

                      {item === "5 Stars" && (
                        <Star
                          size={8}
                          className="fill-[#f3b938] text-[#f3b938]"
                        />
                      )}

                      {item === "Needs Reply" && (
                        <span className="rounded-full bg-red-100 px-1 text-[7px] text-red-500">
                          {item.length}
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>

              <div className="relative">
                <Search
                  size={11}
                  className="absolute left-2.5 top-2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search text..."
                  className="h-7 w-full rounded-md border border-gray-200 pl-7 text-[9px] outline-none focus:border-green-400"
                />
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-3 space-y-3">
              {filteredReviews.map((review: Review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-[#dfe4ea] bg-white p-3"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      {/* NAME + TIME */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold">
                            {review.name}
                          </span>

                          <span className="text-[8px] text-gray-400">
                            · {review.time}
                          </span>
                        </div>

                        {review.isNew && (
                          <span className="rounded-full bg-[#e7faf0] px-2 py-0.5 text-[7px] text-green-600">
                            New
                          </span>
                        )}

                        {review.replied && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[7px] text-gray-500">
                            ✓ Replied
                          </span>
                        )}
                      </div>

                      {/* RATING */}
                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars rating={review.rating} />

                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[7px] text-gray-600">
                          {review.item}
                        </span>
                      </div>

                      {/* REVIEW */}
                      <p className="mt-2 text-[9px] leading-[1.6] text-gray-600">
                        "{review.text}"
                      </p>

                      {/* REPLY */}
                      {review.reply && (
                        <div className="mt-2 border-l-2 border-green-400 bg-[#f7faf8] px-2 py-1.5">
                          <p className="text-[8px] font-semibold text-green-700">
                            Your response · {review.replyTime}
                          </p>

                          <p className="mt-1 text-[8px] leading-4 text-gray-600">
                            {review.reply}
                          </p>
                        </div>
                      )}

                      {/* ACTIONS */}
                      {!review.replied && (
                        <>
                          {openReply === review.id && (
                            <div className="mt-2 flex gap-2">
                              <input
                                value={replyText}
                                onChange={(e) =>
                                  setReplyText(e.target.value)
                                }
                                placeholder="Write your response..."
                                className="h-7 flex-1 rounded-md border border-gray-200 px-2 text-[8px] outline-none focus:border-green-400"
                              />

                              <button
                                onClick={() => replyToReview(review.id)}
                                className="flex h-7 items-center gap-1 rounded-md bg-[#08763b] px-2.5 text-[8px] font-medium text-white"
                              >
                                <Send size={9} />
                                Send
                              </button>
                            </div>
                          )}

                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => {
                                setOpenReply(
                                  openReply === review.id
                                    ? null
                                    : review.id
                                );
                                setReplyText("");
                              }}
                              className="flex items-center gap-1 rounded-md bg-[#08763b] px-3 py-1.5 text-[8px] font-medium text-white"
                            >
                              <MessageCircle size={9} />
                              Reply to Guest
                            </button>

                            <button
                              onClick={() => markAsReplied(review.id)}
                              title="Mark as replied"
                              className="text-gray-400 hover:text-green-600"
                            >
                              <Flag size={10} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white py-10 text-center">
                  <p className="text-xs text-gray-400">
                    No reviews found.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-3">
            {/* TOP RATED */}
            <div className="rounded-xl border border-[#dfe4ea] bg-white p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="flex items-center gap-1 text-[10px] font-semibold">
                    <ThumbsUp
                      size={11}
                      className="text-[#08763b]"
                    />
                    Top Rated Items
                  </h2>

                  <p className="text-[7px] text-gray-400">
                    Based on customer ratings and sentiment.
                  </p>
                </div>

                <MoreHorizontal size={13} className="text-gray-400" />
              </div>

              <div className="mt-3 space-y-3">
                {topItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-[#edf3ff] text-[8px] font-semibold text-[#3469bf]">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[8px] font-semibold">
                        {item.name}
                      </p>

                      <div className="flex items-center gap-1">
                        <Star
                          size={7}
                          className="fill-[#f4b942] text-[#f4b942]"
                        />

                        <span className="text-[7px] text-gray-500">
                          {item.rating} · {item.reviews} reviews
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={10}
                      className="text-gray-400"
                    />
                  </div>
                ))}
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-1 text-[8px] font-medium text-green-700">
                View Full Menu Analytics
                <ArrowRight size={9} />
              </button>
            </div>

            {/* GUIDELINES */}
            <div className="rounded-xl border border-[#dfe4ea] bg-white p-3">
              <h2 className="flex items-center gap-1 text-[10px] font-semibold">
                <MessageCircle
                  size={11}
                  className="text-[#08763b]"
                />
                Reply Guidelines
              </h2>

              <div className="mt-3 space-y-2.5">
                <div className="flex gap-2">
                  <span className="mt-0.5 text-[9px] text-green-600">
                    ✓
                  </span>

                  <p className="text-[8px] leading-3.5 text-gray-500">
                    Always thank the guest for their feedback, positive or
                    negative.
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="mt-0.5 text-[9px] text-green-600">
                    ✓
                  </span>

                  <p className="text-[8px] leading-3.5 text-gray-500">
                    Respond to 1–2 star reviews within 24 hours.
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="mt-0.5 text-[9px] text-green-600">
                    ✓
                  </span>

                  <p className="text-[8px] leading-3.5 text-gray-500">
                    Move complex issues to private messaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}