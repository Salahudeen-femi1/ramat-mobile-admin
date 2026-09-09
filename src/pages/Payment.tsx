import { LuDownload } from 'react-icons/lu'
import ReusableTable from '../utility/ReusableTable';
import ActionCell from '../utility/ActionCell';
import React from 'react';
import { CiBank, CiSearch } from 'react-icons/ci';
import StatCard from '../card/StatCard';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { usePaymentHistory } from '../service/helper';

interface Payment {
  Tranaction_id: string;
  date: string;
  order_id: string;
  amount: string;
  payment_method: string;
  status: "success" | "pending" | "failed"
  customer: string;
  total_revenue: string;
  total_earning: string;
}

export default function Payment() {

  const [selectedOrder, setSelectedOrder] = React.useState(false)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const [dateRange, setDateRange] = React.useState("last_ seven_days")
  const [methodFilter, setMethodFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")

  const {
    paymentRows,
    totalRevenue,
    dailyEarning,
    pendingSettlement,
    refunds,
    dailyEarningTrend,
  } = usePaymentHistory();

  const paymentMethods = ['Smart card', 'Credit Card', 'Wallet', 'Bank transfer']
  const paymentStatuses = ['success', 'pending', 'failed']

  const handleView = () => {
    setSelectedOrder(true)
  }

  const columns = [
    {
      label: "TRANSACTION ID",
      key: "transaction_id",
      render: (item: any) => item.transaction_id || "-"
    },
    {
      label: "ORDER ID",
      key: "order_id",
      render: (item: any) => item.order_id || "-"
    },
    {
      label: "Customer",
      key: "customer",
      render: (item: any) => item.customer || "-"
    },
    {
      label: "AMOUNT",
      key: "amount",
      render: (item: any) => item.amount || "-"
    },
    {
      label: "METHOD",
      key: "method",
      render: (item: any) => item.method || "-"
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
        <StatCard title='Total Revenue'>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-bold">
                  {totalRevenue}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-[8px] text-green-600">
                <TrendingDown size={9} />
                <span>0.2 this month</span>
              </div>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff8f1]">
              <CiBank
                size={13}
                className="fill-[#f4b942] text-[#f4b942]"
              />
            </div>
          </div>
        </StatCard>
        <StatCard title='Daily Earnings'>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-bold">
                  {dailyEarning}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-[8px] text-gray-500">
                {dailyEarningTrend ? (
                  dailyEarningTrend.isIncrease ? (
                    <TrendingUp size={9} className="text-green-600" />
                  ) : (
                    <TrendingDown size={9} className="text-red-600" />
                  )
                ) : null}
                <span>
                  {dailyEarningTrend
                    ? `${dailyEarningTrend.percentage.toFixed(1)}% vs previous day`
                    : "No previous day data"}
                </span>
              </div>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff8f1]">
              <FaRegMoneyBillAlt
                size={13}
                className="fill-[#f4b942] text-[#f4b942]"
              />
            </div>
          </div>
        </StatCard>
        <StatCard title='Pending Settlement'>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-bold">
                  {pendingSettlement}
                </span>
              </div>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff8f1]">
              <MdOutlinePendingActions
                size={13}
                className="fill-[#f4b942] text-[#f4b942]"
              />
            </div>
          </div>
        </StatCard>
        <StatCard title='Refunds'>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] font-bold">
                  {refunds}
                </span>
              </div>
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eff8f1]">
              <MdOutlinePendingActions
                size={13}
                className="fill-[#f4b942] text-[#f4b942]"
              />
            </div>
          </div>
        </StatCard>
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
          data={paymentRows}
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
