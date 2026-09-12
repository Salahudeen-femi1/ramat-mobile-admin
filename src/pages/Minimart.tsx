import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import MenuCard from "../card/MenuCard";
import MartModal from "../modal/MartModal";
import { useQuery } from "@tanstack/react-query";
import { getMart } from "../service/apiService";
import type { Minimart } from "../helper/types";
import { toast } from "sonner";
import { useAvailabilityMutation } from "../service/helper";

export default function Minimart() {
  const [showModal, setShowModal] = useState(false);
  const availabilityMutation = useAvailabilityMutation();

  const { data: minimart, isLoading, error: menuError } = useQuery<Minimart[]>({
    queryKey: ["fetchedMart"],
    queryFn: getMart,
  });

  console.log("minimart", minimart)

  const items = Array.isArray(minimart) ? minimart : [];

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
          <h3 className="font-semibold">Mart namagement</h3>
          <p className="text-sm text-gray-500">
            Configure your minimart digiital offerings and availability.
          </p>
        </div>
        <div className='flex gap-4 items-center '>
          <button onClick={() => setShowModal(true)} className="flex gap-2 items-center text-white text-sm  bg-primary rounded-lg px-4 py-2 cursor-pointer">
            <IoMdAdd size={18} />
            Add Items
          </button>
        </div>
      </div>

      {
        items.length === 0 && !isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-sm">No items available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10 ">
            {items.map((item: Minimart) => (
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
          <MartModal onClose={() => setShowModal(false)} />
        )
      }
    </>
  )
}
