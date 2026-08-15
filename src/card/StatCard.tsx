function StatCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#dfe4ea] bg-white px-4 py-3">
      <p className="text-[10px] font-medium text-gray-500">{title}</p>
      {children}
    </div>
  );
}

export default StatCard;