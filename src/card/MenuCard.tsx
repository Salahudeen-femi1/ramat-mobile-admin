import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import type { MenuItem } from "../helper/types";
import Switch from "../component/Switch";

interface Props {
    item: MenuItem;
}

export default function MenuCard({ item }: Props) {

    const [soldOut, setSoldOut] = React.useState(false)

    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-300 w-[250px]">

            {/* Image */}

            <div className="relative h-50">

                <img
                    src={item.image}
                    className="w-full h-full object-cover"
                />

                {item.featured && (
                    <span className="absolute top-4 left-4 bg-green-700 text-white rounded-full px-5 py-2 text-sm font-medium">
                        Featured
                    </span>
                )}

                { soldOut && (
                    <>
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white px-6 py-3 rounded-lg font-medium">
                                Sold Out
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Content */}

            <div className="p-6">
                <div className="flex justify-between gap-4">
                    <h2 className="font-medium text-[15px] leading-tight">
                        {item.name}
                    </h2>

                    <p className="text-green-700 font-bold text-lg whitespace-nowrap">
                        ${item.price.toFixed(2)}
                    </p>

                </div>

                <span className="inline-flex mt-4 bg-stone-100 rounded-md px-3 py-1 text-xs uppercase tracking-wide text-neutral-500">
                    {item.category}
                </span>

                <hr className="my-6 text-gray-300" />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={item.available}
                            onCheckedChange={(checked) => {
                                console.log(checked);
                            }}
                        />
                        <span className="text-neutral-600">
                            {item.available ? "Available" : "Unavailable"}
                        </span>
                    </div>

                    <button>
                        <FiMoreVertical
                            size={22}
                            className="text-neutral-500"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}