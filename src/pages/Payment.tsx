import { LuDownload } from 'react-icons/lu'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import ReusableTable from '../utility/ReusableTable';
import { paymentStats } from '../helper/data';
import ActionCell from '../utility/ActionCell';
import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface Payment {
  Tranaction_id: string;
  date: string;
  order_id: string;
  amount: string;
  payment_method: string;
  status: "success" | "pending" | "failed"
  customer: string;
}

export default function Payment() {

  const [selectedOrder, setSelectedOrder] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [dateRange, setDateRange] = React.useState("last_ seven_days")
  const [methodFilter, setMethodFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")

  const paymentMethods = ['Smart card', 'Credit Card', 'Wallet', 'Bank transfer']
  const paymentStatuses = ['success', 'pending', 'failed']

  const handleView = () => {
    setSelectedOrder(true)
  }

  const columns = [
    {
      label: "TRANSACTION ID",
      key: "transaction_id"
    },
    {
      label: "ORDER ID",
      key: "order_id"
    },
    {
      label: "Customer",
      key: "customer"
    },
    {
      label: "AMOUNT",
      key: "amount"
    },
    {
      label: "METHOD",
      key: "method"
    },
    {
      label: "STATUS",
      key: "status",
      render: (item: any) => (
        <span className={`px-3 py-1 rounded-xl font-medium ${item.status === "failed" ? "bg-red-100 text-red-500" : item.status === "success" ? "bg-green-100 text-green-500" : item.status === "pending" ? "bg-orange-100 text-orange-500" : "bg-gray-100 text-black"}`}>
          {item.status}
        </span>
      )
    },
    {
      label: "Action",
      key: "action",
      render: (item: any) => (
        <ActionCell
          rowId={Number(item.id)}
          onView={handleView}
          onDelete={() => setDeleteModal(true)}
          toggleAction={() => setSelectedOrder(item)}
        />
      )
    },
  ];

  const data: Payment[] = [
    {
      Tranaction_id: "TRX-9921",
      date: "OCT 25, 10:20",
      order_id: "#ORD-1284",
      customer: "Julian casablanka",
      amount: "200",
      status: "success",
      payment_method: "Smart card"
    },
    {
      Tranaction_id: "TRX-9921",
      date: "OCT 25, 10:20",
      order_id: "#ORD-1284",
      customer: "Julian casablanka",
      amount: "200",
      status: "pending",
      payment_method: "Smart card"
    },
    {
      Tranaction_id: "TRX-9921",
      date: "OCT 25, 10:20",
      order_id: "#ORD-1284",
      customer: "Julian casablanka",
      amount: "200",
      status: "fai",
      payment_method: "Smart card"
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
                  <h3 className="text-xs font-medium text-gray-500">{stat.label}</h3>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <span className="text-gray-200">
                  <Icon size={20} className="text-primary" />
                </span>
              </div>

              <div className={`flex items-center gap-1 text-[10px] mt-1 ${isIncrease ? "text-green-600" : "text-red-600"}`}>
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

        <div className='flex justify-between items-center px-4'>
          <div className="flex flex-wrap gap-4 mb-4">

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg bg-white px-3 py-2 text-xs text-gray-600"
            >
              <option value="last_seven_days">Last 7 days</option>
              <option value="last_one_month">Last 1 month</option>
              <option value="last_two_months">Last 2 months</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="border border-gray-300 rounded-lg bg-white px-3 py-2 text-xs text-gray-600"
            >
              <option value="">All methods</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg bg-white px-3 py-2 text-xs text-gray-600"
            >
              <option value="">All status</option>
              {paymentStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <span className="flex gap-3 items-center mb-4 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer">
            <CiSearch size={18} className="text-gray-500" />
            <input type="text" placeholder="Search ID, Name.." className="placeholder:text-xs outline-none text-xs" />
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
