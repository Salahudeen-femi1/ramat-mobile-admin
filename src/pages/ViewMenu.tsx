import { useNavigate, useParams } from 'react-router-dom';
import OrderProgress from '../component/OrderProgress';
import OrderedItems from '../card/OrderedItems';
import CustomerCard from '../card/CustomerCard';
import PaymentSummaryCard from '../card/PaymentSummaryCard';
import { customer, orderItems, payment } from '../helper/data';

const orderDetails: Record<string, {
    orderNo: string;
    customer: string;
    item: string;
    quantity: string;
    amount: string;
    status: string;
    payment: string;
    time: string;
}> = {
    '1': {
        orderNo: '#ORD-1284',
        customer: 'Julian casablanka',
        item: '1 Plate of rice and chicken',
        quantity: '4',
        amount: '$ 20.00',
        status: 'Received',
        payment: 'Paid',
        time: '19:42',
    },
    '2': {
        orderNo: '#ORD-1285',
        customer: 'Mariam Bello',
        item: 'Spicy Jollof and plantain',
        quantity: '2',
        amount: '$ 28.00',
        status: 'Preparing',
        payment: 'Pending',
        time: '18:25',
    },
};

export default function ViewMenu() {
    const navigate = useNavigate();
    const { id } = useParams();
    const order = orderDetails[id ?? '1'];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg">Order Details</h3>
                    <p className="text-sm text-gray-500">Viewing order {id}</p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate('/dashboard/order')}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Back to Orders
                </button>
            </div>

            <div>
                <OrderProgress />
            </div>

            <div className='grid grid-cols-12 gap-6'>
                <div className="col-span-12 xl:col-span-8">
                    <div className="rounded-t-lg last:border-b-0 border border-gray-300 bg-white p-4  overflow-y-auto max-h-[600px] styled-scrollbar ">
                        <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                            <h3 className="font-semibold">Ordered Items</h3>
                            <span className="text-sm text-gray-500">{orderItems.length} item(s)</span>
                        </div>

                        <div>
                            {orderItems.map((item) => (
                                <OrderedItems
                                    key={item.id}
                                    item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="bg-fadedPrimary font-medium flex justify-end p-4 rounded-b-lg text-xl">
                        Total: $200

                    </div>
                </div>

                <div className="col-span-12 xl:col-span-4 rounded-lg border border-gray-300 bg-white p-4">
                    <CustomerCard customer={customer} />

                    <PaymentSummaryCard payment={payment} />

                </div>
            </div>


        </div>
    );
}
