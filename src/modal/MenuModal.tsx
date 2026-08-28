import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ChevronDown,
  Clock3,
  ImagePlus,
  Plus,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateMealPayload, ModifierGroup } from "../helper/types";
import { createMeal } from "../service/apiService";
import Modal from "./Modal";
import { toast } from "sonner";

interface modalProps {
  onClose: () => void
}

const MenuModal = ({ onClose }: modalProps) => {
  const queryClient = useQueryClient();

  const mealSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Meal name is required")
      .min(2, "Meal name must be at least 2 characters"),

    description: Yup.string()
      .trim()
      .max(500, "Description cannot exceed 500 characters"),

    category: Yup.string()
      .required("Please select a category"),

    basePrice: Yup.number()
      .typeError("Enter a valid price")
      .required("Base price is required")
      .min(0, "Price cannot be negative"),

    preparationTime: Yup.number()
      .typeError("Enter a valid preparation time")
      .required("Preparation time is required")
      .min(1, "Preparation time must be at least 1 minute"),

    availableForOrder: Yup.boolean(),

    trackInventory: Yup.boolean(),

    modifierGroups: Yup.array().of(
      Yup.object({
        name: Yup.string()
          .required("Group name is required"),

        required: Yup.boolean(),

        multiple: Yup.boolean(),

        options: Yup.array().of(
          Yup.object({
            name: Yup.string()
              .required("Option name is required"),

            price: Yup.number()
              .typeError("Enter a valid price")
              .min(0),
          })
        ),
      })
    ),
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(
    null
  );

  const [showCategoryDropdown, setShowCategoryDropdown] =
    useState(false);

  // const [showTagsDropdown, setShowTagsDropdown] =
  //   useState(false);

  const [showModifierModal, setShowModifierModal] =
    useState(false);

  const [modifierName, setModifierName] = useState("");

  const [modifierRequired, setModifierRequired] =
    useState(false);

  const [modifierMultiple, setModifierMultiple] =
    useState(false);

  const [modifierOptions, setModifierOptions] = useState<
    {
      name: string;
      price: number;
    }[]
  >([]);

  // CREATE MEAL

  const createMealMutation = useMutation({
    mutationFn: createMeal,

    onSuccess: () => {
      formik.resetForm();

      setSelectedFile(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      void queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Meal created successfully");
      onClose();
    },

    onError: () => {
      toast.error("Failed to create meal");
    },
  });

  // FORMIK

  const formik = useFormik<CreateMealPayload>({
    initialValues: {
      name: "",
      description: "",
      category: "",
      basePrice: 0,
      preparationTime: 15,
      image: null,
      availableForOrder: true,
      trackInventory: false,
      modifierGroups: [],
    },

    validationSchema: mealSchema,

    onSubmit: (values) => {
      createMealMutation.mutate({
        ...values,
        image: selectedFile,
      });
    },
  });

  // IMAGE HANDLER

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    formik.setFieldValue("image", file);

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };

  // ADD MODIFIER OPTION

  const addModifierOption = () => {
    setModifierOptions((previous) => [
      ...previous,
      {
        name: "",
        price: 0,
      },
    ]);
  };

  // UPDATE MODIFIER OPTION

  const updateModifierOption = (
    index: number,
    field: "name" | "price",
    value: string
  ) => {
    setModifierOptions((previous) =>
      previous.map((option, optionIndex) =>
        optionIndex === index
          ? {
            ...option,
            [field]:
              field === "price"
                ? Number(value)
                : value,
          }
          : option
      )
    );
  };

  // REMOVE MODIFIER OPTION

  const removeModifierOption = (index: number) => {
    setModifierOptions((previous) =>
      previous.filter((_, optionIndex) => optionIndex !== index)
    );
  };

  const addModifierGroup = () => {
    if (!modifierName.trim()) {
      alert("Enter a modifier group name");
      return;
    }

    const newGroup: ModifierGroup = {
      name: modifierName,
      required: modifierRequired,
      multiple: modifierMultiple,
      options: modifierOptions,
    };

    formik.setFieldValue("modifierGroups", [
      ...formik.values.modifierGroups,
      newGroup,
    ]);

    setModifierName("");
    setModifierRequired(false);
    setModifierMultiple(false);
    setModifierOptions([]);

    setShowModifierModal(false);
  };

  // REMOVE MODIFIER GROUP

  const removeModifierGroup = (index: number) => {
    const updatedGroups =
      formik.values.modifierGroups.filter(
        (_, groupIndex) => groupIndex !== index
      );

    formik.setFieldValue(
      "modifierGroups",
      updatedGroups
    );
  };

  // SELECT CATEGOR
  const categories = [
    { _id: "1", name: "Amala" },
    { _id: "2", name: "Rice" },
    { _id: "3", name: "Okele" },
  ];

  const selectedCategory = categories.find(
    (category) => category._id === formik.values.category
  );

  return (
    <Modal onClose={onClose}>
      <div className="min-h-screen bg-[#f6f8fa] text-[#243044]">
        {/* HEADER */}

        <div className="flex h-[58px] items-center justify-between border-b border-[#dfe3e8] bg-white px-7">
          <div className="flex items-center gap-2 text-[12px]">

            <span className="font-semibold text-[#263346]">
              Add New Meal
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              className="text-[11px] font-medium text-[#50565f]"
            >
              Discard Changes
            </button>

            <button
              type="button"
              onClick={() => formik.handleSubmit()
              }
              disabled={createMealMutation.isPending}
              className="flex h-[32px] items-center gap-2 rounded-md bg-[#16703f] px-4 text-[11px] font-semibold text-white transition hover:bg-[#125d35] disabled:opacity-60"
            >
              {createMealMutation.isPending
                ? "Saving..."
                : "✓ Save & Add Meal"}
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-[minmax(0,1fr)_180px] gap-4 px-5 py-5"
        >
          {/* LEFT COLUMN */}

          <div className="space-y-4">

            {/* BASIC INFORMATION */}

            <section className="rounded-xl border border-[#d8ddd9] bg-white p-[15px]">
              <div className="border-b border-[#e0e3e1] pb-3">
                <h2 className="text-[12px] font-semibold">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-4 pt-4">

                {/* NAME */}

                <div>
                  <label className="mb-1.5 block text-[9px] font-medium text-[#40454b]">
                    Meal Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. Signature Truffle Burger"
                    className={`h-[31px] w-full border px-2.5 text-[10px] outline-none transition focus:border-[#6c8b78] ${formik.touched.name &&
                      formik.errors.name
                      ? "border-red-400"
                      : "border-[#bfc5ca]"
                      }`}
                  />

                  {formik.touched.name &&
                    formik.errors.name && (
                      <p className="mt-1 text-[9px] text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                </div>

                {/* DESCRIPTION */}

                <div>
                  <label className="mb-1.5 block text-[9px] font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Briefly describe the meal..."
                    rows={4}
                    className="w-full resize-none border border-[#bfc5ca] px-2.5 py-2 text-[10px] outline-none focus:border-[#6c8b78]"
                  />
                </div>

                {/* CATEGORY / TAGS */}

                <div className="grid grid-cols-2 gap-3">

                  {/* CATEGORY */}

                  <div className="relative">
                    <label className="mb-1.5 block text-[9px] font-medium">
                      Category
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setShowCategoryDropdown(
                          !showCategoryDropdown
                        )
                      }
                      className="flex h-[29px] w-full items-center justify-between border border-[#bfc5ca] bg-white px-2.5 text-[10px]"
                    >
                      <span
                        className={
                          selectedCategory
                            ? "text-[#303640]"
                            : "text-[#707780]"
                        }
                      >
                        {selectedCategory?.name ||
                          "Select a category"}
                      </span>

                      <ChevronDown
                        size={13}
                        className="text-[#777]"
                      />
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute left-0 top-[49px] z-30 w-full border border-[#d4d8dc] bg-white shadow-lg">
                        {categories.map((category) => (
                          <button
                            key={category._id}
                            type="button"
                            onClick={() => {
                              formik.setFieldValue(
                                "category",
                                category._id
                              );
                              setShowCategoryDropdown(false);
                            }}
                            className="block w-full px-3 py-2 text-left text-[10px] hover:bg-[#f3f6f4]"
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* PRICING */}

            <section className="rounded-xl border border-[#d8ddd9] bg-white p-[15px]">
              <div className="flex items-center justify-between border-b border-[#e0e3e1] pb-3">
                <h2 className="text-[12px] font-semibold">
                  Pricing & Preparation
                </h2>

                <label className="flex items-center gap-2 text-[8px]">
                  Featured Meal

                  <button
                    type="button"
                    className="relative h-[15px] w-[29px] rounded-full bg-[#e9efff]"
                  >
                    <span className="absolute left-0.5 top-0.5 h-[11px] w-[11px] rounded-full bg-white shadow" />
                  </button>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">

                <div>
                  <label className="mb-1.5 block text-[9px]">
                    Base Price{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="flex h-[30px] items-center border border-[#bfc5ca] px-2.5">
                    <span className="text-[10px] text-[#555]">
                      $
                    </span>

                    <input
                      type="number"
                      name="basePrice"
                      min="0"
                      step="0.01"
                      value={formik.values.basePrice}
                      onChange={formik.handleChange}
                      className="w-full border-none bg-transparent pl-2 text-[10px] outline-none"
                    />
                  </div>

                  {formik.touched.basePrice &&
                    formik.errors.basePrice && (
                      <p className="mt-1 text-[9px] text-red-500">
                        {formik.errors.basePrice}
                      </p>
                    )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[9px]">
                    Preparation Time (mins)
                  </label>

                  <div className="flex h-[30px] items-center border border-[#bfc5ca] px-2.5">
                    <Clock3
                      size={12}
                      className="text-[#6e7670]"
                    />

                    <input
                      type="number"
                      name="preparationTime"
                      min="1"
                      value={
                        formik.values.preparationTime
                      }
                      onChange={formik.handleChange}
                      className="w-full bg-transparent pl-2 text-[10px] outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* CUSTOMIZATION */}

            <section className="rounded-xl border border-[#d8ddd9] bg-white p-[15px]">

              <div className="flex items-center justify-between border-b border-[#e0e3e1] pb-3">
                <div>
                  <h2 className="text-[12px] font-semibold">
                    Customization
                  </h2>

                  <p className="mt-1 text-[9px] text-[#737a80]">
                    Add optional extras or modifiers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowModifierModal(true)
                  }
                  className="flex items-center gap-1 rounded-md bg-[#e9f0ff] px-2.5 py-1.5 text-[9px] font-medium text-[#28724d]"
                >
                  <Plus size={11} />
                  Add Group
                </button>
              </div>

              {formik.values.modifierGroups.length ===
                0 ? (
                <div className="mt-4 flex min-h-[115px] flex-col items-center justify-center rounded-md border border-dashed border-[#cbd4ce] bg-[#fbfcfd]">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#e9efff]">
                    <SlidersHorizontal
                      size={13}
                      className="text-[#516b86]"
                    />
                  </div>

                  <p className="text-[11px] font-semibold">
                    No modifiers added
                  </p>

                  <p className="mt-1 text-[9px] text-[#747b82]">
                    Add extras such as toppings,
                    sauces, or sides.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {formik.values.modifierGroups.map(
                    (group, index) => (
                      <div
                        key={`${group.name}-${index}`}
                        className="rounded-md border border-[#d8ddd9] p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-[10px] font-semibold">
                              {group.name}
                            </h3>

                            <p className="mt-1 text-[8px] text-[#747b82]">
                              {group.required
                                ? "Required"
                                : "Optional"}{" "}
                              ·{" "}
                              {group.multiple
                                ? "Multiple selection"
                                : "Single selection"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeModifierGroup(
                                index
                              )
                            }
                            className="text-red-500"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="mt-3 space-y-1.5">
                          {group.options.map(
                            (option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex justify-between rounded border border-[#edf0ee] px-2 py-1.5 text-[9px]"
                              >
                                <span>
                                  {option.name}
                                </span>

                                <span>
                                  +$
                                  {option.price.toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN */}

          <div className="space-y-4">

            {/* MEDIA */}

            <section className="rounded-xl border border-[#d8ddd9] bg-white p-[15px]">
              <h2 className="border-b border-[#e0e3e1] pb-3 text-[12px] font-semibold">
                Media
              </h2>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-3 flex h-[112px] w-full flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-[#c5d0c8] bg-[#fcfdfd]"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Meal preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f5fc]">
                      <ImagePlus
                        size={17}
                        className="text-[#68746e]"
                      />
                    </div>

                    <p className="text-[9px] font-medium text-[#28724d]">
                      Click to upload
                      <span className="text-[#656b70]">
                        {" "}
                        or drag and drop
                      </span>
                    </p>

                    <p className="mt-1 text-[7px] text-[#8a9094]">
                      SVG, PNG, JPG or GIF (max.
                      800x400px)
                    </p>
                  </>
                )}
              </button>

              {selectedFile && (
                <p className="mt-2 truncate text-[8px] text-[#626970]">
                  {selectedFile.name}
                </p>
              )}
            </section>

            {/* AVAILABILITY */}

            <section className="rounded-xl border border-[#d8ddd9] bg-white p-[15px]">
              <h2 className="border-b border-[#e0e3e1] pb-3 text-[12px] font-semibold">
                Availability
              </h2>

              <div className="mt-3 rounded-md bg-[#e9efff] p-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-medium">
                      Available for Order
                    </p>

                    <p className="mt-1 text-[8px] text-[#68717a]">
                      Visible on digital menus
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      formik.setFieldValue(
                        "availableForOrder",
                        !formik.values
                          .availableForOrder
                      )
                    }
                    className={`relative h-[16px] w-[29px] rounded-full transition ${formik.values
                      .availableForOrder
                      ? "bg-[#14713e]"
                      : "bg-[#b8bec2]"
                      }`}
                  >
                    <span
                      className={`absolute top-[2px] h-3 w-3 rounded-full bg-white shadow transition ${formik.values
                        .availableForOrder
                        ? "right-[2px]"
                        : "left-[2px]"
                        }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-[#e5e7e6] pt-3">
                <p className="text-[8px] text-[#687078]">
                  Inventory Tracking
                </p>

                <label className="mt-2 flex cursor-pointer items-center gap-2 text-[9px]">
                  <input
                    type="checkbox"
                    checked={
                      formik.values.trackInventory
                    }
                    onChange={(event) =>
                      formik.setFieldValue(
                        "trackInventory",
                        event.target.checked
                      )
                    }
                    className="h-3 w-3"
                  />

                  Track quantity in stock
                </label>
              </div>
            </section>
          </div>
        </form>

        {/* =========================
          ADD MODIFIER MODAL
      ========================= */}

        {showModifierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-[420px] rounded-xl bg-white p-5 shadow-xl">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[14px] font-semibold">
                    Add Modifier Group
                  </h2>

                  <p className="mt-1 text-[9px] text-[#707780]">
                    Add extras customers can select.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowModifierModal(false)
                  }
                  className="text-[#777]"
                >
                  ✕
                </button>
              </div>

              {/* GROUP NAME */}

              <div className="mt-5">
                <label className="mb-1.5 block text-[9px] font-medium">
                  Group Name
                </label>

                <input
                  value={modifierName}
                  onChange={(event) =>
                    setModifierName(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Extra Toppings"
                  className="h-[32px] w-full border border-[#bfc5ca] px-2.5 text-[10px] outline-none focus:border-[#6c8b78]"
                />
              </div>

              {/* OPTIONS */}

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-medium">
                    Options
                  </label>

                  <button
                    type="button"
                    onClick={addModifierOption}
                    className="flex items-center gap-1 text-[9px] font-medium text-[#16703f]"
                  >
                    <Plus size={11} />
                    Add Option
                  </button>
                </div>

                <div className="mt-2 space-y-2">
                  {modifierOptions.map(
                    (option, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <input
                          value={option.name}
                          onChange={(event) =>
                            updateModifierOption(
                              index,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="Option name"
                          className="h-[30px] flex-1 border border-[#bfc5ca] px-2 text-[9px] outline-none"
                        />

                        <input
                          type="number"
                          min="0"
                          value={option.price}
                          onChange={(event) =>
                            updateModifierOption(
                              index,
                              "price",
                              event.target.value
                            )
                          }
                          placeholder="Price"
                          className="h-[30px] w-[75px] border border-[#bfc5ca] px-2 text-[9px] outline-none"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeModifierOption(
                              index
                            )
                          }
                          className="text-red-500"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* SETTINGS */}

              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2 text-[9px]">
                  <input
                    type="checkbox"
                    checked={modifierRequired}
                    onChange={(event) =>
                      setModifierRequired(
                        event.target.checked
                      )
                    }
                  />

                  Required selection
                </label>

                <label className="flex items-center gap-2 text-[9px]">
                  <input
                    type="checkbox"
                    checked={modifierMultiple}
                    onChange={(event) =>
                      setModifierMultiple(
                        event.target.checked
                      )
                    }
                  />

                  Allow multiple selections
                </label>
              </div>

              {/* BUTTONS */}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModifierModal(false)
                  }
                  className="rounded-md border border-[#d1d5d3] px-4 py-2 text-[9px]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={addModifierGroup}
                  className="rounded-md bg-[#16703f] px-4 py-2 text-[9px] font-semibold text-white"
                >
                  Add Group
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MenuModal;