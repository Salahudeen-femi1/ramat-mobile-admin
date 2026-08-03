import { IoMdAdd } from "react-icons/io";
import { menuItems } from "../helper/data";
import MenuCard from "../card/MenuCard";

export default function Menu() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Menu namagement</h3>
          <p className="text-sm text-gray-500">
            Configure your resturant's didgital offerings and availability.
          </p>
        </div>
        <div className='flex gap-4 items-center '>
          <span className="flex gap-2 items-center text-white text-sm  bg-primary rounded-lg px-4 py-2 cursor-pointer">
            <IoMdAdd size={18} />
            Add New Meal
          </span>

        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10">
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </>
  )
}
