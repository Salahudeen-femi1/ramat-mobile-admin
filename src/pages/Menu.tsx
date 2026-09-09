import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import MenuCard from "../card/MenuCard";
import MenuModal from "../modal/MenuModal";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../service/apiService";
import type { MenuResponse } from "../helper/types";
import { toast } from "sonner";
import { useAvailabilityMutation } from "../service/helper";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const availabilityMutation = useAvailabilityMutation();

  const { data: menuResponse, isLoading, error: menuError } = useQuery<MenuResponse>({
    queryKey: ["fetchedItems"],
    queryFn: getMenu,
  });

  const items = Array.isArray(menuResponse?.items) ? menuResponse.items : [];

  const handleToggleAvailability = (itemId: string, available: boolean) => {
    availabilityMutation.mutate({ itemId, available });
  };

  useEffect(() => {
    if (menuError) {
      const message =
        (menuError as any)?.response?.data?.message ||
        "An error occurred while fetching menu items.";

      toast.error(message);
    }
  }, [menuError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-sm">Loading menu items...</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col sm:text-center md:text-left gap-5 md:flex md:flex-row lg:flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Menu namagement</h3>
          <p className="text-sm text-gray-500">
            Configure your resturant's didgital offerings and availability.
          </p>
        </div>
        <div className='flex gap-4 items-center '>
          <button onClick={() => setShowModal(true)} className="flex gap-2 items-center text-white text-sm  bg-primary rounded-lg px-4 py-2 cursor-pointer">
            <IoMdAdd size={18} />
            Add New Meal
          </button>
        </div>
      </div>

      {
        items.length === 0 && !isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-sm">No menu items available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-10 ">
            {items.map((item: MenuResponse) => (
              <MenuCard
                key={item.id ?? item._id}
                item={item}
                onToggleAvailability={(available) =>
                  handleToggleAvailability(item.id, available)
                }
              />
            ))}
          </div>
        )
      }

      {
        showModal && (
          <MenuModal onClose={() => setShowModal(false)} />
        )
      }
    </>
  )
}
