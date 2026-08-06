import { LuDownload } from 'react-icons/lu'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import ReusableTable from '../utility/ReusableTable';
import { paymentStats } from '../helper/data';
import ActionCell from '../utility/ActionCell';

export default function Payment() {

  const columns = [
    {
      label: "ORDER NO.",
      key: "order_no"
    },
    {
      label: "CODE",
      key: "code"
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
          onView={handleView}
          onEdit={handleEdit}
          onDelete={() => setDeleteModal(true)}
          toggleAction={() => setSelectedOrder(item)}
        />
      )
    },
  ];

  const data: orderData[] = [
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
      payment: "failed"
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

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Payments</h3>
          <p className="text-sm text-gray-500">
            Manage and track all transaction data.
          </p>
        </div>
        <div className='flex gap-4 items-center '>
          <span className="flex gap-2 items-center text-gray-500 text-sm border border-gray-300 rounded-lg bg-white px-4 py-2 cursor-pointer">
            <LuDownload size={18} />
            Export CSV/PDF
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {paymentStats.map((stat, index) => {

          const isIncrease = stat.change >= 0;
          const Icon = stat.icon;

          return (
            <div className='bg-white border border-gray-300 rounded-lg p-4'>
              <div key={index} className=" flex justify-between ">
                <div className="">
                  <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                  <p className="text-xl font-medium">{stat.value}</p>
                </div>
                <span className="text-gray-200">
                  <Icon size={20} className="text-primary" />
                </span>
              </div>

              <div className={`flex items-center gap-1 text-xs font-medium mt-3 ${isIncrease ? "text-green-600" : "text-red-600"}`}>
                {
                  isIncrease ? (
                    <FaArrowTrendUp />
                  ) : (
                    <FaArrowTrendDown />
                  )
                }
                <span>{Math.abs(stat.change)}% {stat.period} </span>
              </div>
            </div>
          )

        })}
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
    </>
  )
}
