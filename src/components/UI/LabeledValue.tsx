export function LabeledEntry({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 py-2 px-4">
      <h5 className="text-2xl font-bold">{label}</h5>
      <p className="text-2xl ml-auto">{value}</p>
    </div>
  );
}
