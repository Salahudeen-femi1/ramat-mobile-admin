export default function SmallInput({
  label,
  value,
  suffix,
  onChange,
}: {
  label: string;
  value: string;
  suffix: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[7px] text-gray-400">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full rounded-md border border-gray-200 px-2 pr-8 text-[9px] outline-none focus:border-green-500"
        />

        <span className="absolute right-2 top-2 text-[7px] text-gray-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}
