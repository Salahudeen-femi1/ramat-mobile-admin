import type { orderedItem } from "../helper/types";

interface Props {
    item: orderedItem;
}

export default function OrderedItems({ item }: Props) {
    return (
        <>
            <div className="flex justify-between items-center border-b border-gray-300 py-4 last:border-b-0">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-lg">
                        <img
                            src={item.image}
                            alt={item.label}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium">{item.label}</p>
                        <span className={`mt-2 inline-flex rounded-xl px-3 py-1 text-xs font-medium ${item.status === "failed" ? "bg-red-100 text-red-500" : item.status === "pending" ? "bg-blue-100 text-blue-500" : item.status === "paid" ? "bg-green-100 text-green-500" : "bg-gray-100 text-black"}`}>
                            {item.status}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <p className="font-semibold">${item.price}</p>
                    <span className="flex flex-col items-center gap-1 text-xs text-gray-500">
                        <p>QTY</p>
                        <p className="font-semibold text-gray-800">{item.quantity}</p>
                    </span>
                </div>
            </div>
        </>
    )
}