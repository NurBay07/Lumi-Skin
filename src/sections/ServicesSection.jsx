import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { useServices } from "../context/ServicesContext.jsx";

export default function ServicesSection() {
  const { services, categories, loading, error } = useServices();
  const [selected, setSelected] = useState("Барлығы");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selected === "Барлығы" || service.category === selected;
      const matchesQuery = service.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [services, selected, query]);

  return (
    <section id="services" className="section-pad">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Қызметтер"
          title="Барлық ем-процедуралар"
          subtitle="Категория бойынша фильтр және атауы арқылы іздеу."
        />
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          <div className="flex flex-wrap gap-2">
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
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Іздеу (мыс: пилинг)"
            className="w-full md:w-64 rounded-full border border-ink/10 px-4 py-2 text-sm"
          />
        </div>

        {loading && <p>Жүктелуде...</p>}
        {error && <p className="text-accent">{error}</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
