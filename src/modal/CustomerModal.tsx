import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Modal from './Modal'
import { useQuery } from "@tanstack/react-query";
import { getCustomerDetails } from "../service/apiService";

interface CustomerModalProps {
    onClose: () => void;
    customerId: string | number;
}

interface CustomerData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status?: string;
}

export default function CustomerModal({ onClose, customerId }: CustomerModalProps) {

    const { data: customer, isLoading, error } = useQuery<CustomerData>({
        queryKey: ['customerData', customerId],
        queryFn: () => getCustomerDetails(customerId),
    })

    return (
        <Modal onClose={onClose}>
            {
                isLoading ? (
                    <div className="flex items-center justify-center h-32">Loading customer details...</div>
                ) : error ? (
                    <div className="flex items-center justify-center h-32 text-red-500">Error loading customer details</div>
                ) : (
                    customer ? (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                Customer Details
                            </h3>

                            <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
                                <div className="bg-gray-200 rounded-full h-25 w-25"></div>

                                <div className="flex flex-col gap-1">
                                    <div className='text-xl font-medium'>{customer.first_name} {customer.last_name}</div>
                                    <span className={`text-sm font-medium rounded-full w-20 py-1 text-center  ${customer.status === 'active' ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-black'}`}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-5">
                                <span className="text-xl font-medium uppercase text-gray-500">Contact Info</span>

                                <div className='flex gap-3 items-center '>
                                    <MdOutlineEmail size={20} />
                                    <p className="text-xl font-medium text-gray-500">
                                        {customer.email}
                                    </p>
                                </div>
                                <div className='flex gap-3 items-center '>
                                    <IoIosCall size={20} />
                                    <p className="text-xl font-medium text-gray-500">
                                        {customer.phone}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-32">Customer not found</div>
                    )
                )
            }



        </Modal>
    )
}
