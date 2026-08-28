import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import MenuCard from "../card/MenuCard";
import MenuModal from "../modal/MenuModal";
import { useQuery } from "@tanstack/react-query";
import { getMeal } from "../service/apiService";
import type { MenuItem } from "../helper/types";

export default function Menu() {
  // const [items, setItems] = useState(menuItems);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);

  const handleToggleAvailability = (itemId: string, available: boolean) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
            ...item,
            available,
            soldOut: !available,
          }
          : item
      )
    );
  };

  const { data: fetchedItems = [] } = useQuery({
    queryKey:["items"],
    queryFn: getMeal
  });

  useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItems]);

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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-10 ">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onToggleAvailability={(available) =>
              handleToggleAvailability(item.id, available)
            }
          />
        ))}
      </div>

      {
        showModal && (
          <MenuModal onClose={() => setShowModal(false)} />
        )
      }
    </>
  )
}
