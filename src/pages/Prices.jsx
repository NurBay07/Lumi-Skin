import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import PriceCard from "../components/PriceCard.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { api } from "../lib/api.js";
import { fallbackPackages, fallbackPrices } from "../data/fallback.js";

export default function Prices() {
  const [prices, setPrices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState("Барлығы");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricesRes, packRes] = await Promise.all([
          api.get("/prices"),
          api.get("/packages"),
        ]);
        setPrices(pricesRes.data);
        setPackages(packRes.data);
      } catch (err) {
        setPrices(fallbackPrices);
        setPackages(fallbackPackages);
      }
    };
    fetchData();
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
    <section className="section-pad">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Бағалар"
          title="Прайс-лист және абонементтер"
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

        <div className="mt-16">
          <SectionHeader
            eyebrow="Пакеттер"
            title="Кешенді күтім жоспарлары"
            subtitle="Ұзақ мерзімді нәтижеге арналған тиімді пакеттер."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pack) => (
              <PackageCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
