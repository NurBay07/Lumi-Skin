import { useEffect, useState } from "react";
import { useServices } from "../context/ServicesContext.jsx";
import { useBookings } from "../context/BookingContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../lib/api.js";

const emptyService = {
  name: "",
  category: "",
  duration: "",
  price: "",
  shortDesc: "",
  fullDesc: "",
  indications: "",
  contraindications: "",
  aftercare: "",
  faqs: "",
};

const emptyPrice = { title: "", price: "", note: "" };
const emptyPackage = { title: "", subtitle: "", price: "", includes: "", bonus: "" };

export default function Admin() {
  const { services, createService, updateService, deleteService } =
    useServices();
  const { bookings } = useBookings();
  const { logout } = useAuth();

  const [serviceForm, setServiceForm] = useState(emptyService);
  const [editingId, setEditingId] = useState(null);
  const [prices, setPrices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [priceForm, setPriceForm] = useState(emptyPrice);
  const [packageForm, setPackageForm] = useState(emptyPackage);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editingPackageId, setEditingPackageId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [pricesRes, packagesRes] = await Promise.all([
          api.get("/prices"),
          api.get("/packages"),
        ]);
        setPrices(pricesRes.data);
        setPackages(packagesRes.data);
      } catch (err) {
        setPrices([]);
        setPackages([]);
      }
    };
    fetch();
  }, []);

  const handleServiceSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: serviceForm.name,
      category: serviceForm.category,
      duration: serviceForm.duration,
      price: serviceForm.price,
      shortDesc: serviceForm.shortDesc,
      fullDesc: serviceForm.fullDesc,
      indications: serviceForm.indications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      contraindications: serviceForm.contraindications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      aftercare: serviceForm.aftercare,
      faqs: serviceForm.faqs
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [q, a] = line.split("|");
          return { q: q?.trim() || "", a: a?.trim() || "" };
        })
        .filter((faq) => faq.q && faq.a),
    };
    if (editingId) {
      await updateService(editingId, { ...payload, id: editingId });
    } else {
      await createService(payload);
    }
    setServiceForm(emptyService);
    setEditingId(null);
  };

  const startEditService = (service) => {
    setEditingId(service.id);
    setServiceForm({
      name: service.name,
      category: service.category,
      duration: service.duration,
      price: service.price,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc,
      indications: service.indications.join(", "),
      contraindications: service.contraindications.join(", "),
      aftercare: service.aftercare,
      faqs: service.faqs.map((f) => `${f.q}|${f.a}`).join("\n"),
    });
  };

  const handlePriceSubmit = async (event) => {
    event.preventDefault();
    if (editingPriceId) {
      const { data } = await api.put(`/prices/${editingPriceId}`, {
        ...priceForm,
        id: editingPriceId,
      });
      setPrices((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } else {
      const { data } = await api.post("/prices", priceForm);
      setPrices((prev) => [data, ...prev]);
    }
    setPriceForm(emptyPrice);
    setEditingPriceId(null);
  };

  const handlePackageSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...packageForm,
      includes: packageForm.includes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editingPackageId) {
      const { data } = await api.put(`/packages/${editingPackageId}`, {
        ...payload,
        id: editingPackageId,
      });
      setPackages((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    } else {
      const { data } = await api.post("/packages", payload);
      setPackages((prev) => [data, ...prev]);
    }
    setPackageForm(emptyPackage);
    setEditingPackageId(null);
  };

  const deletePrice = async (id) => {
    await api.delete(`/prices/${id}`);
    setPrices((prev) => prev.filter((p) => p.id !== id));
  };

  const deletePackage = async (id) => {
    await api.delete(`/packages/${id}`);
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="section-pad">
      <div className="container-pad space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
              Admin panel
            </p>
            <h1 className="font-display text-3xl mt-2">Басқару панелі</h1>
          </div>
          <button onClick={logout} className="btn-outline">
            Шығу
          </button>
        </div>

        <div className="card p-8">
          <h2 className="font-semibold text-xl mb-4">Қызметтер (CRUD)</h2>
          <form onSubmit={handleServiceSubmit} className="grid gap-3">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                placeholder="Атауы"
                value={serviceForm.name}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, name: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Категория"
                value={serviceForm.category}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, category: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Ұзақтығы (мыс: 60 мин)"
                value={serviceForm.duration}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, duration: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Баға (мыс: 25 000 ₸)"
                value={serviceForm.price}
                onChange={(e) =>
                  setServiceForm((p) => ({ ...p, price: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
            </div>
            <textarea
              placeholder="Қысқаша сипаттама"
              value={serviceForm.shortDesc}
              onChange={(e) =>
                setServiceForm((p) => ({ ...p, shortDesc: e.target.value }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
              rows={2}
              required
            ></textarea>
            <textarea
              placeholder="Толық ақпарат"
              value={serviceForm.fullDesc}
              onChange={(e) =>
                setServiceForm((p) => ({ ...p, fullDesc: e.target.value }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
              rows={3}
              required
            ></textarea>
            <input
              placeholder="Көрсетілімдер (үтір арқылы)"
              value={serviceForm.indications}
              onChange={(e) =>
                setServiceForm((p) => ({ ...p, indications: e.target.value }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
            />
            <input
              placeholder="Қарсы көрсетілімдер (үтір арқылы)"
              value={serviceForm.contraindications}
              onChange={(e) =>
                setServiceForm((p) => ({
                  ...p,
                  contraindications: e.target.value,
                }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
            />
            <textarea
              placeholder="Aftercare кеңесі"
              value={serviceForm.aftercare}
              onChange={(e) =>
                setServiceForm((p) => ({ ...p, aftercare: e.target.value }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
              rows={2}
            ></textarea>
            <textarea
              placeholder="FAQ (әр жол: Сұрақ|Жауап)"
              value={serviceForm.faqs}
              onChange={(e) =>
                setServiceForm((p) => ({ ...p, faqs: e.target.value }))
              }
              className="rounded-xl border border-ink/10 px-4 py-2"
              rows={3}
            ></textarea>
            <button className="btn-primary" type="submit">
              {editingId ? "Жаңарту" : "Қосу"}
            </button>
          </form>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.id} className="card p-4">
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-ink/60">{service.category}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    className="btn-outline text-sm"
                    onClick={() => startEditService(service)}
                  >
                    Өңдеу
                  </button>
                  <button
                    className="btn-primary text-sm"
                    onClick={() => deleteService(service.id)}
                  >
                    Өшіру
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-8">
            <h2 className="font-semibold text-xl mb-4">Прайс-лист</h2>
            <form onSubmit={handlePriceSubmit} className="grid gap-3">
              <input
                placeholder="Атауы"
                value={priceForm.title}
                onChange={(e) =>
                  setPriceForm((p) => ({ ...p, title: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Баға"
                value={priceForm.price}
                onChange={(e) =>
                  setPriceForm((p) => ({ ...p, price: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Ескерту"
                value={priceForm.note}
                onChange={(e) =>
                  setPriceForm((p) => ({ ...p, note: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
              <button className="btn-primary" type="submit">
                {editingPriceId ? "Жаңарту" : "Қосу"}
              </button>
            </form>
            <div className="mt-4 space-y-3">
              {prices.map((item) => (
                <div key={item.id} className="card p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-ink/60">{item.price}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="btn-outline text-sm"
                      onClick={() => {
                        setEditingPriceId(item.id);
                        setPriceForm(item);
                      }}
                    >
                      Өңдеу
                    </button>
                    <button
                      className="btn-primary text-sm"
                      onClick={() => deletePrice(item.id)}
                    >
                      Өшіру
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <h2 className="font-semibold text-xl mb-4">Пакеттер</h2>
            <form onSubmit={handlePackageSubmit} className="grid gap-3">
              <input
                placeholder="Атауы"
                value={packageForm.title}
                onChange={(e) =>
                  setPackageForm((p) => ({ ...p, title: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Қысқаша"
                value={packageForm.subtitle}
                onChange={(e) =>
                  setPackageForm((p) => ({ ...p, subtitle: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
              <input
                placeholder="Баға"
                value={packageForm.price}
                onChange={(e) =>
                  setPackageForm((p) => ({ ...p, price: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
                required
              />
              <input
                placeholder="Құрамына кіреді (үтір арқылы)"
                value={packageForm.includes}
                onChange={(e) =>
                  setPackageForm((p) => ({ ...p, includes: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
              <input
                placeholder="Бонус"
                value={packageForm.bonus}
                onChange={(e) =>
                  setPackageForm((p) => ({ ...p, bonus: e.target.value }))
                }
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
              <button className="btn-primary" type="submit">
                {editingPackageId ? "Жаңарту" : "Қосу"}
              </button>
            </form>
            <div className="mt-4 space-y-3">
              {packages.map((item) => (
                <div key={item.id} className="card p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-ink/60">{item.price}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      className="btn-outline text-sm"
                      onClick={() => {
                        setEditingPackageId(item.id);
                        setPackageForm({
                          ...item,
                          includes: item.includes.join(", "),
                        });
                      }}
                    >
                      Өңдеу
                    </button>
                    <button
                      className="btn-primary text-sm"
                      onClick={() => deletePackage(item.id)}
                    >
                      Өшіру
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="font-semibold text-xl mb-4">Жазылулар тізімі</h2>
          <div className="grid gap-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="card p-4">
                <p className="font-semibold">{booking.name}</p>
                <p className="text-sm text-ink/60">
                  {booking.service} • {booking.date} {booking.time}
                </p>
                <p className="text-sm text-ink/50">{booking.phone}</p>
              </div>
            ))}
            {!bookings.length && (
              <p className="text-ink/60">Әзірге жазылу жоқ.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
