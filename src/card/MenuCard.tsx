import React from "react";
import type { MenuItem } from "../helper/types";
import Switch from "../component/Switch";
import ActionCell from "../utility/ActionCell";
import ConfirmDialog from "../modal/ConfirmDialog";
import MenuModal from "../modal/MenuModal";
import { toast } from "sonner";
import { useDeleteMenu } from "../service/helper";

interface Props {
    item: MenuItem;
    onToggleAvailability?: (available: boolean) => void;
}

export default function MenuCard({ item, onToggleAvailability }: Props) {
    const soldOut = item.soldOut || !item.available;

    const [confirmDialog, setConfirmDialog] = React.useState(false)
    const [selectedMenu, setSelectedMenu] = React.useState<MenuItem | null>(null)
    const [showEditModal, setShowEditModal] = React.useState(false)

    const deleteMenuMutation = useDeleteMenu();

    const handleDeleteMenu = () => {
        if (!selectedMenu?._id) return;

        deleteMenuMutation.mutate(selectedMenu._id, {
            onSuccess: () => {
                toast.success("Menu deleted successfully");
                setConfirmDialog(false);
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Failed to delete Menu");
            }
        })

    }

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

                {soldOut && (
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
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between ">
                        <h2 className="font-medium text-[15px] leading-tight">
                            {item.name}
                        </h2>
                        <p className="text-green-700 font-medium text-[15px] whitespace-nowrap">
                            N{item.price.toFixed(2)}
                        </p>
                    </div>


                    <p className="text-xs text-gray-500 font-medium ">{item.description}</p>
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
                                onToggleAvailability?.(checked);
                            }}
                        />
                        <span className="text-neutral-600">
                            {item.available ? "Available" : "Unavailable"}
                        </span>
                    </div>

                    <ActionCell
                        rowId={item.id ?? item._id ?? ""}
                        onDelete={() => {
                            setConfirmDialog(true)
                            setSelectedMenu(item)
                        }}
                        onEdit={() => {
                            setSelectedMenu(item);
                            setShowEditModal(true);
                        }}
                    />
                </div>
            </div>

            {
                confirmDialog && (
                    <ConfirmDialog
                        isOpen={confirmDialog}
                        title="Delete Menu"
                        message={`Are you sure you want to delete this menu? This action cannot be undone.`}
                        onCancel={() => setConfirmDialog(false)}
                        onConfirm={handleDeleteMenu}
                        isLoading={false}
                    />
                )
            }

            {showEditModal && (
                <MenuModal
                    onClose={() => setShowEditModal(false)}
                    mode="edit"
                    editingItem={item}
                />
            )}
        </div>
    );
}