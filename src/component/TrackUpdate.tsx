import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getOrderTracking } from "../service/apiService";

type OrderStatus =
    | "received"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    extras?: {
        id: string;
        name: string;
        price: number;
    }[];
}

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    pickupTime: string;
    pickupOutlet: string;
    paymentStatus: "pending" | "paid" | "failed";
    status: OrderStatus;
    totalAmount: number;
    items: OrderItem[];
    createdAt: string;
}

export default function Tracking() {
    const [search, setSearch] = useState("");
    const [selectedOrderId, setSelectedOrderId] = useState("");

    const queryClient = useQueryClient();

    const {
        data: order,
        isLoading,
        isError,
    } = useQuery<Order>({
        queryKey: ["order", selectedOrderId],
        queryFn: () => getOrderById(selectedOrderId),
        enabled: !!selectedOrderId,
    });

    const statusMutation = useMutation({
        mutationFn: ({
            orderId,
            status,
        }: {
            orderId: string;
            status: OrderStatus;
        }) => getOrderTracking(orderId, status),

        onSuccess: () => {
            toast.success("Order status updated");

            queryClient.invalidateQueries({
                queryKey: ["order", selectedOrderId],
            });

            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },

        onError: () => {
            toast.error("Failed to update order status");
        },
    });

    const handleSearch = () => {
        if (!search.trim()) {
            toast.error("Enter an order ID");
            return;
        }

        setSelectedOrderId(search.trim());
    };

    const handleStatusChange = (status: OrderStatus) => {
        if (!order) return;

        statusMutation.mutate({
            orderId: order.id,
            status,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Order Tracking
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Track and manage customer orders.
                </p>
            </div>

            {/* Search */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex gap-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="Enter order ID"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                    >
                        Track Order
                    </button>
                </div>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                    <p className="text-sm text-gray-500">
                        Loading order...
                    </p>
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="bg-white border border-red-200 rounded-xl p-10 text-center">
                    <p className="text-sm text-red-500">
                        Order not found.
                    </p>
                </div>
            )}

            {/* Order */}
            {order && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Header */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Order ID
                                    </p>

                                    <h3 className="font-semibold text-gray-900 mt-1">
                                        #{order.orderNumber}
                                    </h3>
                                </div>

                                <StatusBadge status={order.status} />
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Customer
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <Info
                                    label="Name"
                                    value={order.customerName}
                                />

                                <Info
                                    label="Phone"
                                    value={order.customerPhone}
                                />
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Order Items
                            </h3>

                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.name}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.quantity} × ₦
                                                    {item.price.toLocaleString()}
                                                </p>

                                                {item.extras?.length ? (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-400">
                                                            Extras
                                                        </p>

                                                        {item.extras.map((extra) => (
                                                            <p
                                                                key={extra.id}
                                                                className="text-xs text-gray-500"
                                                            >
                                                                {extra.name} — ₦
                                                                {extra.price.toLocaleString()}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>

                                            <p className="font-medium text-gray-900">
                                                ₦
                                                {(
                                                    item.price * item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 mt-5 pt-4 flex justify-between">
                                <span className="font-semibold">
                                    Total
                                </span>

                                <span className="font-bold text-lg">
                                    ₦{order.totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pickup */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold mb-4">
                                Pickup Details
                            </h3>

                            <div className="space-y-4">
                                <Info
                                    label="Pickup Time"
                                    value={order.pickupTime}
                                />

                                <Info
                                    label="Outlet"
                                    value={order.pickupOutlet}
                                />

                                <Info
                                    label="Payment"
                                    value={order.paymentStatus}
                                />
                            </div>
                        </div>

                        {/* Update Status */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h3 className="font-semibold mb-4">
                                Update Status
                            </h3>

                            <div className="space-y-2">
                                {(
                                    [
                                        "received",
                                        "preparing",
                                        "ready",
                                        "completed",
                                        "cancelled",
                                    ] as OrderStatus[]
                                ).map((status) => (
                                    <button
                                        key={status}
                                        disabled={
                                            statusMutation.isPending ||
                                            order.status === status
                                        }
                                        onClick={() =>
                                            handleStatusChange(status)
                                        }
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm capitalize ${order.status === status
                                                ? "bg-primary text-white"
                                                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {statusMutation.isPending &&
                                            order.status !== status
                                            ? "Updating..."
                                            : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs text-gray-400 mb-1">
                {label}
            </p>

            <p className="text-sm text-gray-800 capitalize">
                {value}
            </p>
        </div>
    );
}

function StatusBadge({
    status,
}: {
    status: OrderStatus;
}) {
    return (
        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium capitalize">
            {status}
        </span>
    );
}