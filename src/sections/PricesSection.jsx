import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import PriceCard from "../components/PriceCard.jsx";
import { api } from "../lib/api.js";

export default function PricesSection() {
  const [prices, setPrices] = useState([]);
  const [selected, setSelected] = useState("Барлығы");

  useEffect(() => {
    api.get("/prices").then((res) => setPrices(res.data));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(prices.map((p) => p.category).filter(Boolean));
    return ["Барлығы", ...Array.from(set)];
  }, [prices]);

  const filtered = useMemo(() => {
    if (selected === "Барлығы") return prices;
    return prices.filter((p) => p.category === selected);
  }, [prices, selected]);

  return (
    <section id="prices" className="section-pad bg-white/60">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Бағалар"
          title="Прайс-лист"
          subtitle="Айқын бағалар, жасырын төлемдер жоқ."
        />
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`chip ${selected === cat ? "bg-rose text-white" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PriceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
