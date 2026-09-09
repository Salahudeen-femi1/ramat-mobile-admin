import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, getAverageRating, getRating, updateMenuAvailability } from "./apiService";
import { toast } from "sonner";
import { getPaymenntHistory } from '../service/apiService';
import type { PaymentHistoryResponse, PaymentTransaction } from "../helper/types";

interface Review {
  id: number;
  name: string;
  text: string;
  item: string;
  rating: number;
  replied: boolean;
  count: string | number;
  time: string;
  isNew: boolean;
  reply: string;
  replyTime: string;
  avatar: string;
}

export const useAvailabilityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuAvailability,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchedItems"],
      });

      toast.success("Availability updated");
    },

    onError: () => {
      toast.error("Failed to update availability");
    },
  });
};

export const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      toast.success("Customer deleted successfully");
    },
  })
}

export const useAverageRating = () => {
  return useQuery({
    queryKey: ['average'],
    queryFn: getAverageRating
  })
}

export const useRating = () => {
  return useQuery<Review[]>({
    queryKey: ['rating'],
    queryFn: getRating
  })
}

export const usePaymentHistory = () => {
  const query = useQuery<PaymentHistoryResponse>({
    queryKey: ["paymentHistory"],
    queryFn: getPaymenntHistory
  });

  const paymentRows = useMemo(
    () => query.data?.payments ?? query.data?.data ?? [],
    [query.data]
  );
  const dailyEarningTrend = useMemo(() => {
    const earningsByDay = paymentRows.reduce<Record<string, number>>(
      (totals, payment: PaymentTransaction) => {
        if (payment.status !== "success") return totals;

        const day = payment.date.slice(0, 10);
        const amount = Number(String(payment.amount).replace(/[^0-9.-]+/g, ""));

        if (!day || Number.isNaN(amount)) return totals;

        totals[day] = (totals[day] ?? 0) + amount;
        return totals;
      },
      {}
    );

    const days = Object.keys(earningsByDay).sort();
    if (days.length < 2) return null;

    const current = earningsByDay[days[days.length - 1]];
    const previous = earningsByDay[days[days.length - 2]];
    const percentage = previous === 0
      ? current === 0 ? 0 : 100
      : Math.abs(((current - previous) / previous) * 100);

    return { isIncrease: current >= previous, percentage };
  }, [paymentRows]);

  return {
    ...query,
    paymentRows,
    totalRevenue: query.data?.total_revenue ?? 0,
    dailyEarning: query.data?.daily_earning ?? 0,
    pendingSettlement: query.data?.pending_settlement ?? 0,
    refunds: query.data?.refunds ?? 0,
    dailyEarningTrend,
  };
};
