export default function PackageCard({ pack }) {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-lg">{pack.title}</h3>
        <p className="text-ink/60 mt-1">{pack.subtitle}</p>
      </div>
      <ul className="text-sm text-ink/70 list-disc pl-5">
        {pack.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-2xl font-semibold">{pack.price}</p>
        <span className="chip">{pack.bonus}</span>
      </div>
    </div>
  );
}
