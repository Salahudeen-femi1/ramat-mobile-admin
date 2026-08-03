import React from 'react'
import ReusableTable from '../utility/ReusableTable'
import { LuDownload } from 'react-icons/lu'
import { IoFilter } from 'react-icons/io5'
import ActionCell from '../utility/ActionCell'
import CustomerModal from '../modal/CustomerModal'

export default function Customers() {

  const [viewModal, setViewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const columns = [
    {
      label: "CUSTOMER",
      key: "customer"
    },
    {
      label: "CONTACT INFO",
      key: "contact_info"
    },
    {
      label: "ORDERES",
      key: "orders"
    },
    {
      label: "TOTAL SPENT",
      key: "total_spent"
    },
    {
      label: "LAST ORDER",
      key: "last_order"
    },
    {
      label: "STATUS",
      key: "status",
      render: (item: any) => (
        <span className={`px-3 py-1 rounded-xl font-medium ${item.status === "active" ? "bg-green-100 text-green-500" : item.status === "inactive" ? "bg-gray-100 text-black" : "bg-gray-100 text-black"}`}>
          {item.status}
        </span>
      )
    },
    {
      label: "Action",
      key: "action",
      render: (item: any) => (
        <ActionCell
          canView={true}
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
      id: 1,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "active",
      time: '1942',
      payment: "paid"
    },
    {
      id: 2,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "inactive",
      time: '1942',
      payment: "paid"
    },
    {
      id: 3,
      customer: "Julian casablanka",
      contact_info: "johndoe@example.com",
      orders: "4",
      total_spent: "$ 120.00",
      last_order: "2023-08-15",
      status: "active",
      time: '1942',
      payment: "paid"
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Orders</h3>
          <p className="text-sm text-gray-500">
            Manage and track your most loyal diners
          </p>
        </div>
        <div className='flex gap-4 items-center '>
          <span className="flex gap-3 items-center border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer text-gray-500 text-xs">
            <IoFilter size={18} className="text-gray-500" />
            Filter
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-sm border border-gray-300 rounded-lg bg-white px-4 py-2 cursor-pointer">
            <LuDownload size={18} />
            Export CSV
          </span>

        </div>
      </div>

      <div className="mt-10 bg-white border border-gray-300 rounded-lg ">
        <span className=" flex gap-4 justify-start px-3 py-4 text-sm">
          All Customer (1,248)
        </span>
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

      {
        viewModal && (
          <CustomerModal onClose={() => setViewModal(false)} />
        )
      }


    </>
  )
}
