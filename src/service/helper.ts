import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, getAverageRating, getRating, updateMenuAvailability } from "./apiService";
import { toast } from "sonner";

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
    queryKey:['average'],
    queryFn: getAverageRating
  })
}

export const useRating = () => {
  return useQuery<Review[]>({
    queryKey: ['rating'],
    queryFn: getRating
  })  
}