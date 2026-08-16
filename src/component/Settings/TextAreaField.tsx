export default function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-md border border-gray-200 bg-white px-2.5 py-2 text-[9px] text-gray-700 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-100"
      />
    </div>
  );
}