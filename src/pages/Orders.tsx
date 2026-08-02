import React from "react";
import { LuDownload, LuStar } from "react-icons/lu";
import ReusableTable from "../utility/ReusableTable";
import ActionCell from "../utility/ActionCell";
import { IoFilter } from "react-icons/io5";
import { CalendarRange } from "lucide-react";
import { MdOutlineTimer } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";

export default function Orders() {

  const [viewModal, setViewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const columns = [
    {
      label: "ORDER NO.",
      key: "order_no"
    },
    {
      label: "Customer",
      key: "customer"
    },
    {
      label: "ITEM ORDERED",
      key: "item_ordered"
    },
    {
      label: "QTY",
      key: "quantity"
    },
    {
      label: "AMOUNT",
      key: "amount"
    },
    {
      label: "STATUS",
      key: "status",
      render: (item: any) => (
        <span className={`px-3 py-1 rounded-xl font-medium ${item.status === "cancelled" ? "bg-red-100 text-red-500" : item.status === "recieved" ? "bg-blue-100 text-blue-500" : item.status === "ready" ? "bg-green-100 text-green-500" : item.status === "completed" ? "bg-gray-100 text-black" : item.status === "preparing" ? "bg-orange-100 text-orange-500" : "bg-gray-100 text-black"}`}>
          {item.status}
        </span>
      )
    },
    {
      label: "PAYMENT",
      key: "payment",
      render: (item: any) => (
        <span className={`px-3 py-1 rounded-xl font-medium ${item.payment === "failed" ? "bg-red-100 text-red-500" : item.payment === "pending" ? "bg-blue-100 text-blue-500" : item.payment === "paid" ? "bg-green-100 text-green-500" : "bg-gray-100 text-black"}`}>
          {item.payment}
        </span>
      )
    },
    {
      label: "TIME",
      key: "time"
    },
    {
      label: "Action",
      key: "action",
      render: (item: any) => (
        <ActionCell
          rowId={Number(item.id)}
          onView={() => setViewModal(true)}
          onDelete={() => setDeleteModal(true)}
          toggleAction={() => setSelectedOrder(item)}
        />
      )
    },
  ];

  const data = [
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "recieved",
      time: '1942',
      payment: "paid"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "cancelled",
      time: '1942',
      payment: "faild"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "completed",
      time: '1942',
      payment: "pending"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "preparing",
      time: '1942',
      payment: "paid"
    },
    {
      order_no: "#ORD-1284",
      code: "k72",
      customer: "Julian casablanka",
      item_ordered: "1 Plate of rice and chicken",
      quantity: "4",
      amount: "$ 20.00",
      status: "ready",
      time: '1942',
      payment: "failed"
    },
  ]

  const orderStats = [
    {
      label: "Total Orders Today",
      icon: <RiFileList3Line size={35} />,
      value: "156"
    },
    {
      label: "Average Prep Time",
      icon: <MdOutlineTimer size={35} />,
      value: "18m"
    },
    {
      label: "Today's Revenue",
      icon: <TbCurrencyNaira size={35} />,
      value: "$1,250"
    },
    {
      label: "Satisfactory Score",
      icon: <LuStar size={35} />,
      value: "$4.9"
    },
  ]
  return (
    <>
      <div className='flex justify-between items-center '>
        <div>
          <h3 className="font-semibold">Orders</h3>
          <p className="text-sm text-gray-500">
            Manage and track your restaurants order flow in real-time
          </p>
        </div>
        <div className="flex gap-2 items-center mt-4 text-gray-500 text-sm border border-gray-300 rounded-lg bg-white px-4 py-2 cursor-pointer">
          <LuDownload size={20} />
          Prints daily reports
        </div>
      </div>

      <div className="mt-10 bg-white border border-gray-300 rounded-lg py-4 ">
        <div className=" flex gap-4 justify-end px-4">
          <span className="flex gap-3 items-center mb-4 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer">
            <IoFilter size={18} className="text-gray-500" />
            <input type="text" placeholder="Search orders status..." className="placeholder:text-xs outline-none text-xs" />
          </span>
          <span className="flex gap-3 items-center mb-4 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer">
            <CalendarRange size={18} className="text-gray-500" />
            <input type="text" placeholder="Search status using date..." className="placeholder:text-xs outline-none text-xs" />
          </span>
        </div>
        <ReusableTable
          isLoading={false}
          error={null}
          data={data}
          columns={columns}
          currentPage={1}
          totalPages={5}
          totalItems={50}
          setCurrentPage={() => { }}
          itemsPerPage={10}
          setItemsPerPage={() => { }}
          hasSerialNo={true}
        />

      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-300 flex justify-between rounded-lg p-4">
            <div className="">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <p className="text-xl font-medium">{stat.value}</p>
            </div>
            <span className="text-gray-200">
              {stat.icon}
            </span>
          </div>
        ))}
      </div>



    </>
  )
}
