import React, { useEffect } from 'react'
import ReusableTable from '../utility/ReusableTable'
import { LuDownload } from 'react-icons/lu'
import { IoFilter } from 'react-icons/io5'
import ActionCell from '../utility/ActionCell'
import CustomerModal from '../modal/CustomerModal'
import { getCustomers } from '../service/apiService'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import ConfirmDialog from '../modal/ConfirmDialog'
import { useDeleteCustomerMutation } from '../service/helper'

export default function Customers() {

  const [viewModal, setViewModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
  const deleteCustomerMutation = useDeleteCustomerMutation();

  const columns = [
    {
      label: "FIRST NAME",
      key: "first_name",
      render: (item: any) => item.first_name || "-",
    },
    {
      label: "LAST NAME",
      key: "last_name",
      render: (item: any) => item.last_name || "-",
    },
    {
      label: "CONTACT INFO",
      key: "phone",
      render: (item: any) => item.phone || "-",
    },
    {
      label: "ORDERES",
      key: "orders",
      render: (item: any) => item.orders || "-",
    },
    {
      label: "TOTAL SPENT",
      key: "total_spent",
      render: (item: any) => item.total_spent || "-",
    },
    {
      label: "LAST ORDER",
      key: "last_order",
      render: (item: any) => item.last_order || "-",
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
          onView={() => {
            setSelectedCustomer(item);
            setViewModal(true);
          }}
          onDelete={() => {
            setSelectedCustomer(item);
            setDeleteModal(true);
          }}
        />
      )
    },
  ];

  const handleDeleteCustomer = () => {
    deleteCustomerMutation.mutate(selectedCustomer.id, {
      onSuccess: () => {
        toast.success("Customer deleted successfully");
        setDeleteModal(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to delete customer");
      }
    })
  }

  const { data: customers = [], isLoading, error: customerError } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers
  })

  useEffect(() => {
    if (customerError) {
      const message = (customerError as any).response?.data?.message || "An error occurred while fetching customers.";

      toast.error(message);
    }
  }, [customerError])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-sm">Loading menu items...</p>
      </div>
    )
  }

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

      {
        customers.length === 0 && !isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-sm">No customers available.</p>
          </div>
        ) : (
          <div className="mt-10 bg-white border border-gray-300 rounded-lg ">
            <span className=" flex gap-4 justify-start px-3 py-4 text-sm">
              All Customer ({customers.length})
            </span>
            <ReusableTable
              isLoading={false}
              error={customerError}
              data={customers}
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
        )
      }

      {
        viewModal && (
          <CustomerModal
            onClose={() => setViewModal(false)}
            customerId={selectedCustomer.id}
          />
        )
      }

      {
        deleteModal && (
          <ConfirmDialog
            isOpen={deleteModal}
            title="Delete Customer"
            message={`Are you sure you want to delete ${selectedCustomer?.first_name}? This action cannot be undone.`}
            onCancel={() => setDeleteModal(false)}
            onConfirm={handleDeleteCustomer}
            isLoading={false}
          />
        )
      }


    </>
  )
}
