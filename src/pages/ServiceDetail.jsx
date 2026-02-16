import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { api } from "../lib/api.js";
import { fallbackServices } from "../data/fallback.js";
import FaqList from "../components/FaqList.jsx";
import { useServices } from "../context/ServicesContext.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

export default function ServiceDetail() {
  const { id } = useParams();
  const { services } = useServices();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        const fallback = fallbackServices.find(
          (item) => String(item.id) === String(id)
        );
        setService(fallback || null);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <section className="section-pad">
        <div className="container-pad">Жүктелуде...</div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="section-pad">
        <div className="container-pad">Қызмет табылмады.</div>
      </section>
    );
  }

  const related = services
    .filter((item) => String(item.id) !== String(service.id))
    .slice(0, 3);

  return (
    <section className="section-pad">
      <div className="container-pad">
        <div className="card p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="chip">{service.category}</p>
              <h1 className="font-display text-3xl mt-3">{service.name}</h1>
              <p className="text-ink/60 mt-3">{service.fullDesc}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">{service.price}</p>
              <p className="text-sm text-ink/60">{service.duration}</p>
              <NavLink to="/booking" className="btn-primary mt-4">
                Жазылу
              </NavLink>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-semibold text-xl">Көрсетілімдер</h2>
            <ul className="list-disc pl-5 text-ink/60 mt-3 space-y-1">
            {(service.indications || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-xl">Қарсы көрсетілімдер</h2>
            <ul className="list-disc pl-5 text-ink/60 mt-3 space-y-1">
            {(service.contraindications || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
            </ul>
          </div>
        </div>

        <div className="card p-6 mt-8">
          <h2 className="font-semibold text-xl">Күтім кеңесі (Aftercare)</h2>
          <p className="text-ink/60 mt-3">{service.aftercare}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">Жиі сұрақтар</h2>
          <FaqList faqs={service.faqs} />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-semibold text-xl mb-4">Ұқсас қызметтер</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
