export default function SocialInput({
  icon,
  iconClass,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  iconClass: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        {icon}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 flex-1 rounded-md border border-gray-200 px-2.5 text-[9px] outline-none focus:border-green-500"
      />
    </div>
  );
}