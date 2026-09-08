import React, { useEffect } from "react";
import { LuDownload } from "react-icons/lu";
import ReusableTable from "../utility/ReusableTable";
import ActionCell from "../utility/ActionCell";
import { IoFilter } from "react-icons/io5";
import { CalendarRange } from "lucide-react";
import type { orderData } from "../helper/types";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../service/apiService";
import { toast } from "sonner";

export default function Orders({ isRecent }: { isRecent: boolean }) {

  const navigate = useNavigate();

  const [viewModal, setViewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any | null>(null);

  const [statusFilter, setStatusFilter] = React.useState<"all" | "received" | "cancelled" | "completed" | "preparing" | "ready">('all');
  const [paymentFilter, setPaymentFilter] = React.useState<"all" | "paid" | "failed" | "pending">('all');
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const handleView = (order_no: number | string) => {
    navigate(`/dashboard/order/view/${order_no}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/dashboard/order/edit/${id}`);
  };

  const columns = [
    {
      label: "ORDER NO.",
      key: "order_no",
      render: (item: any) => item.order_no || "-",
      className: "p-4 text-xs whitespace-nowrap",
    },
    {
      label: "CODE",
      key: "code",
      render: (item: any) => item.code || "-",
      className: "p-4 text-xs whitespace-nowrap",
    },
    {
      label: "Customer",
      key: "customer",
      render: (item: any) => item.customer || "-",
      className: "p-4 text-xs whitespace-nowrap",
    },
    {
      label: "ITEM ORDERED",
      key: "item_ordered",
      render: (item: any) => item.item_ordered || "-",
      className: "p-4 text-xs whitespace-nowrap",
    },
    {
      label: "QTY",
      key: "quantity",
      render: (item: any) => item.quantity || "-",
      className: "p-4 text-xs whitespace-nowrap",
    },
    {
      label: "AMOUNT",
      key: "amount",
      render: (item: any) => item.amount || "-",
      className: "p-4 text-xs whitespace-nowrap",
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
      key: "time",
      render: (item: any) => item.time || "-",
      className: "p-4 text-xs whitespace-nowrap",
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

  const queryParams = {
    currentPage: isRecent ? currentPage : undefined,
    per_page: isRecent ? 5 : 10,
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(paymentFilter !== 'all' && { payment: paymentFilter }),
  };

  const { data: orders = [], isLoading, error: orderError } = useQuery<orderData[]>({
    queryKey: ['orders', currentPage, statusFilter, paymentFilter, isRecent],
    queryFn: () => getOrders(queryParams),
  });

  const displayedOrder = isRecent
    ? (orders ?? []).slice(0, 4)
    : (orders ?? []);


  const itemsPerPage = 5
  const lastPage = Math.ceil(displayedOrder.length / itemsPerPage);

  useEffect(() => {
    if (orderError) {
      const message = (orderError as any).response?.data?.message || "An error occurred while fetching orders.";

      toast.error(message);
    }
  }, [])

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
          {/* <span className="flex gap-3 items-center mb-4 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer">
            <IoFilter size={18} className="text-gray-500" />
            <input type="text" placeholder="Search orders status..." className="placeholder:text-xs outline-none text-xs" />
          </span>
          <span className="flex gap-3 items-center mb-4 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer">
            <CalendarRange size={18} className="text-gray-500" />
            <input type="text" placeholder="Search status using date..." className="placeholder:text-xs outline-none text-xs" />
          </span> */}

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="md:col-span-2 indent-3 mb-4 pe-1 h-[45px] border border-black/10 bg-[#D3D3D3]/10 rounded-lg focus:outline-none text-xs"
          >
            <option value="all">All Status</option>
            <option value="recieved">Received</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="md:col-span-2 indent-3 mb-4  pe-1 h-[45px] border border-black/10 bg-[#D3D3D3]/10 rounded-lg focus:outline-none text-xs"
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <ReusableTable
          isLoading={isLoading}
          error={orderError}
          data={displayedOrder || []}
          columns={columns}
          currentPage={currentPage}
          totalPages={lastPage}
          totalItems={displayedOrder.length}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={() => { }}
          hasSerialNo={true}
        />

      </div>

    </>
  )
}
