import { MdOutlineEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import Modal from './Modal'

interface CustomerModalProps {
    onClose: () => void;
}

interface CustomerData {
    id: number;
    customer: string;
    contact_info: string;
    phone_number: string;
    location: string;
    status?: string;
}

const customerData: CustomerData[] = [
    {
        id: 1,
        customer: "Julian casablanka",
        contact_info: "johndoe@example.com",
        phone_number: "+1 123-456-7890",
        location: "New York, USA",
    },
]

export default function CustomerModal({ onClose }: CustomerModalProps) {
    return (
        <Modal onClose={onClose}>
            {
                customerData.map((customer) => (
                    <div key={customer.id}>
                        <h3 className="text-lg font-semibold mb-4">
                            Customer Details
                        </h3>

                        <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
                            <div className="bg-gray-200 rounded-full h-25 w-25"></div>

                            <div className="flex flex-col gap-1">
                                <div className='text-xl font-medium'>{customer.customer}</div>
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
                                    {customer.contact_info}
                                </p>
                            </div>
                            <div className='flex gap-3 items-center '>
                                <IoIosCall size={20} />
                                <p className="text-xl font-medium text-gray-500">
                                    {customer.phone_number}
                                </p>
                            </div>
                            <div className='flex gap-3 items-center '>
                                <IoLocationSharp size={20} />
                                <p className="text-xl font-medium text-gray-500">
                                    {customer.location}
                                </p>
                            </div>

                        </div>
                    </div>
                ))
            }

        </Modal>
    )
}
