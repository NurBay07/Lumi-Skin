export default function PriceCard({ item }) {
  return (
    <div className="card p-6 flex flex-col gap-3">
      <h3 className="font-semibold text-lg">{item.title}</h3>
      <p className="text-ink/60">{item.note}</p>
      <p className="text-2xl font-semibold text-ink">{item.price}</p>
    </div>
  );
}
