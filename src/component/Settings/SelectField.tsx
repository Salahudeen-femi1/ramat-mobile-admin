import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[8px] font-bold uppercase tracking-wide text-gray-500">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full appearance-none rounded-md border border-gray-200 bg-white px-2.5 pr-7 text-[8px] outline-none focus:border-green-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={10}
          className="pointer-events-none absolute right-2 top-2.5 text-gray-400"
        />
      </div>
    </div>
  );
}