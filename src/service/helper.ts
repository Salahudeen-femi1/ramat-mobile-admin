import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer, updateMenuAvailability } from "./apiService";
import { toast } from "sonner";

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
        queryKey: ["fetchedCustomers"],
      });
      toast.success("Customer deleted successfully");
    },
  })
}