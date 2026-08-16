import { useState, type ChangeEvent } from "react";
import type { BusinessDay, StoreForm } from "../helper/types";
import { initialBusinessDays, initialForm } from "../helper/data";
import {
  AlertCircle,
  Building2,
  Camera,
  Clock3,
  Globe2,
  Link2,
  Plus,
  Save,
  Store,
  Upload,
} from "lucide-react";
import SectionHeader from "../component/Settings/SectionHeader";
import InputField from "../component/Settings/InputField";
import TextAreaField from "../component/Settings/TextAreaField";
import SmallInput from "../component/Settings/SmallInput";
import SocialInput from "../component/Settings/SocialInput";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { convertTo24Hour, convertToDisplayTime } from "../helper/Conversion";

export default function Settings() {
  const [form, setForm] = useState<StoreForm>(initialForm);

  const [businessDays, setBusinessDays] =
    useState<BusinessDay[]>(initialBusinessDays);

  const [logoPreview, setLogoPreview] = useState<string>("");

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const updateField = <K extends keyof StoreForm>(
    field: K,
    value: StoreForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover"
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (type === "logo") {
      setLogoPreview(imageUrl);
      updateField("logo", imageUrl);
    }

    if (type === "cover") {
      updateField("coverImage", imageUrl);
    }
  };

  const updateBusinessDay = (
    id: string,
    field: keyof BusinessDay,
    value: string | boolean
  ) => {
    setBusinessDays((current) =>
      current.map((day) =>
        day.id === id
          ? {
            ...day,
            [field]: value,
          }
          : day
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const payload = {
        store: form,
        businessHours: businessDays,
      };

      console.log("Saving store settings:", payload);

      // Replace this with your API call:
      //
      // await axios.put("/api/store/settings", payload);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setMessage("Changes saved successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setForm(initialForm);
    setBusinessDays(initialBusinessDays);
    setLogoPreview("");
    setMessage("");
  };

  const handleSyncSocial = async () => {
    console.log("Syncing social media data...");

    // API example:
    // await axios.post("/api/store/social/sync");

    setMessage("Social data synchronized.");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 text-[#263238]">
      <div className="mx-auto max-w-[1100px]">

        {/* ================= HEADER ================= */}

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight">
              Store Settings
            </h1>

            <p className="mt-1 text-[11px] text-gray-500">
              Configure your restaurant's digital presence and
              operational core.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscard}
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-[10px] font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Discard Changes
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-md bg-[#006b3c] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#005d34] disabled:opacity-60"
            >
              <Save size={11} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-[10px] text-green-700">
            {message}
          </div>
        )}

        {/* ================= BRANDING ================= */}

        <section className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <SectionHeader
            icon={<Store size={12} />}
            title="Branding & Identity"
          />

          <div className="p-4">

            {/* COVER IMAGE */}

            <label className="mb-2 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
              Cover Image
            </label>

            <div className="relative h-[135px] overflow-hidden rounded-lg border border-gray-200">
              <img
                src={form.coverImage}
                alt="Store cover"
                className="h-full w-full object-cover brightness-75"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
                  <Camera size={14} />
                </div>

                <p className="text-[11px] font-semibold text-white">
                  Emerald Grill Downtown
                </p>

                <p className="mt-1 text-[8px] text-white/80">
                  Recommended size: 1200 × 400 px
                </p>

                <label className="mt-2 cursor-pointer rounded bg-white/90 px-2.5 py-1 text-[8px] font-semibold text-gray-700 hover:bg-white">
                  Change Cover
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, "cover")
                    }
                  />
                </label>
              </div>
            </div>

            {/* LOGO */}

            <div className="mt-4 grid gap-4 sm:grid-cols-[100px_1fr]">
              <div>
                <label className="mb-2 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
                  Brand Logo
                </label>

                <div className="flex h-[90px] w-[90px] items-center justify-center rounded-lg border border-gray-200 bg-white">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="h-full w-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded border border-green-200 bg-green-50">
                        <Building2
                          size={16}
                          className="text-green-700"
                        />
                      </div>

                      <span className="text-[7px] text-gray-400">
                        Emerald Grill
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5">
                <h3 className="text-[11px] font-semibold">
                  Upload your brand's logo
                </h3>

                <p className="mt-1 max-w-[550px] text-[9px] leading-4 text-gray-500">
                  Upload your official high-resolution logo. We
                  recommend SVG or transparent PNG files for the
                  best display across all terminal devices.
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-1.5 rounded border border-gray-200 px-3 py-1.5 text-[8px] font-semibold text-gray-700 hover:bg-gray-50">
                    <Upload size={10} />
                    Upload Logo

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, "logo")
                      }
                    />
                  </label>

                  {logoPreview && (
                    <button
                      onClick={() => {
                        setLogoPreview("");
                        updateField("logo", "");
                      }}
                      className="text-[8px] font-medium text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TWO COLUMN GRID ================= */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* ================= GENERAL INFORMATION ================= */}

          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <SectionHeader
              icon={<Building2 size={12} />}
              title="General Information"
            />

            <div className="space-y-3 p-4">

              <InputField
                label="Restaurant Name"
                value={form.restaurantName}
                onChange={(value) =>
                  updateField("restaurantName", value)
                }
              />

              <InputField
                label="Contact Email"
                type="email"
                value={form.contactEmail}
                onChange={(value) =>
                  updateField("contactEmail", value)
                }
              />

              <InputField
                label="Phone Number"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
              />

              <TextAreaField
                label="Address"
                value={form.address}
                onChange={(value) =>
                  updateField("address", value)
                }
              />
            </div>
          </section>

          {/* ================= OPERATIONS ================= */}

          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <SectionHeader
              icon={<Clock3 size={12} />}
              title="Operations"
            />

            <div className="p-4">

              <label className="mb-2 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
                Standard Opening Hours
              </label>

              <div className="space-y-1">
                {businessDays.map((day) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-between rounded-md bg-[#eaf0ff] px-2.5 py-2"
                  >
                    <span className="text-[9px] font-semibold">
                      {day.label}
                    </span>

                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={convertTo24Hour(day.open)}
                        onChange={(e) =>
                          updateBusinessDay(
                            day.id,
                            "open",
                            convertToDisplayTime(
                              e.target.value
                            )
                          )
                        }
                        className="border-0 bg-transparent text-[8px] outline-none"
                      />

                      <span className="text-[8px] text-gray-400">
                        -
                      </span>

                      <input
                        type="time"
                        value={convertTo24Hour(day.close)}
                        onChange={(e) =>
                          updateBusinessDay(
                            day.id,
                            "close",
                            convertToDisplayTime(
                              e.target.value
                            )
                          )
                        }
                        className="border-0 bg-transparent text-[8px] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setBusinessDays((current) => [
                    ...current,
                    {
                      id: crypto.randomUUID(),
                      label: "Custom",
                      enabled: true,
                      open: "09:00 AM",
                      close: "09:00 PM",
                    },
                  ])
                }
                className="mt-1 flex items-center gap-1 text-[8px] font-semibold text-green-700"
              >
                <Plus size={9} />
                Add Weekly Schedule
              </button>

              {/* PREP TIMES */}

              <label className="mt-4 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
                Prep & Delivery Times
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <SmallInput
                  label="Avg. Pickup Time"
                  value={form.pickupTime}
                  suffix="min"
                  onChange={(value) =>
                    updateField("pickupTime", value)
                  }
                />

                <SmallInput
                  label="Avg. Delivery Time"
                  value={form.deliveryTime}
                  suffix="min"
                  onChange={(value) =>
                    updateField("deliveryTime", value)
                  }
                />
              </div>

              {/* AUTO ACCEPT */}

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-semibold">
                    Auto-Accept Orders
                  </p>

                  <p className="text-[7px] text-gray-400">
                    Send orders directly to the kitchen.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "autoAcceptOrders",
                      !form.autoAcceptOrders
                    )
                  }
                  className={`relative h-5 w-9 rounded-full transition ${form.autoAcceptOrders
                      ? "bg-[#08763b]"
                      : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition ${form.autoAcceptOrders
                        ? "left-[19px]"
                        : "left-[3px]"
                      }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* ================= SOCIAL ================= */}

          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <SectionHeader
              icon={<Link2 size={12} />}
              title="Social Connectivity"
            />

            <div className="p-4">

              <SocialInput
                icon={<FaFacebook size={12} />}
                iconClass="bg-blue-50 text-blue-600"
                value={form.facebook}
                onChange={(value) =>
                  updateField("facebook", value)
                }
              />

              <SocialInput
                icon={<BsInstagram size={12} />}
                iconClass="bg-pink-50 text-pink-500"
                value={form.instagram}
                onChange={(value) =>
                  updateField("instagram", value)
                }
              />

              <SocialInput
                icon={<BsYoutube size={12} />}
                iconClass="bg-red-50 text-red-500"
                value={form.youtube}
                onChange={(value) =>
                  updateField("youtube", value)
                }
              />

              <button
                onClick={handleSyncSocial}
                className="mt-3 ml-auto flex items-center gap-1.5 rounded-md bg-[#e8efff] px-3 py-1.5 text-[8px] font-semibold text-blue-700"
              >
                <Globe2 size={9} />
                Sync Social Data
              </button>
            </div>
          </section>
        </div>

        {/* ================= MAINTENANCE ================= */}

        <section className="mt-4 rounded-xl border border-red-100 bg-[#fff3f5] p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                <AlertCircle
                  size={13}
                  className="text-red-500"
                />
              </div>

              <div>
                <p className="text-[9px] font-semibold text-red-500">
                  Maintenance Mode
                </p>

                <p className="text-[8px] text-gray-500">
                  Pause all online operations and show a
                  custom maintenance message to customers.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                updateField(
                  "maintenanceMode",
                  !form.maintenanceMode
                )
              }
              className={`rounded-md px-4 py-2 text-[9px] font-bold text-white ${form.maintenanceMode
                  ? "bg-green-600"
                  : "bg-red-600"
                }`}
            >
              {form.maintenanceMode
                ? "Deactivate Pause"
                : "Activate Pause"}
            </button>
          </div>

          {form.maintenanceMode && (
            <textarea
              value={form.maintenanceMessage}
              onChange={(e) =>
                updateField(
                  "maintenanceMessage",
                  e.target.value
                )
              }
              className="mt-3 min-h-[70px] w-full rounded-md border border-red-100 bg-white p-2 text-[9px] outline-none focus:border-red-300"
              placeholder="Maintenance message..."
            />
          )}
        </section>
      </div>
    </div>
  );
}