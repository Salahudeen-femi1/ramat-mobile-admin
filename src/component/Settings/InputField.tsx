export default function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded-md border border-gray-200 bg-white px-2.5 text-[9px] text-gray-700 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-100"
      />
    </div>
  );
}