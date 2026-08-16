export default function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 bg-[#f7f9ff] px-4 py-3">
      <span className="text-[#08763b]">{icon}</span>

      <h2 className="text-[10px] font-semibold text-gray-700">
        {title}
      </h2>
    </div>
  );
}