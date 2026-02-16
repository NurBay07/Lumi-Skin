import { useState } from "react";
import { useServices } from "../context/ServicesContext.jsx";
import { useBookings } from "../context/BookingContext.jsx";

const initialState = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
};

export default function Booking() {
  const { services } = useServices();
  const { createBooking } = useBookings();
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        createdAt: new Date().toISOString(),
      };
      await createBooking(payload);
      setForm(initialState);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      const message =
        `Жаңа жазылу:%0A` +
        `Аты-жөні: ${encodeURIComponent(payload.name)}%0A` +
        `Телефон: ${encodeURIComponent(payload.phone)}%0A` +
        `Қызмет: ${encodeURIComponent(payload.service)}%0A` +
        `Күні: ${encodeURIComponent(payload.date)}%0A` +
        `Уақыты: ${encodeURIComponent(payload.time)}`;
      window.location.href = `https://wa.me/77789811742?text=${message}`;

      const botToken = import.meta.env.VITE_TG_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TG_CHAT_ID;
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text:
              `Жаңа жазылу\n` +
              `Аты-жөні: ${payload.name}\n` +
              `Телефон: ${payload.phone}\n` +
              `Қызмет: ${payload.service}\n` +
              `Күні: ${payload.date}\n` +
              `Уақыты: ${payload.time}`,
          }),
        });
      }
    } catch (err) {
      setError("Қате болды. Сервер қосулы екеніне көз жеткізіңіз.");
    }
  };

  return (
    <section className="section-pad">
      <div className="container-pad grid gap-10 lg:grid-cols-2 items-start">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
            Онлайн жазылу
          </p>
          <h1 className="font-display text-3xl mt-3">Жеке қабылдауға жазылу</h1>
          <p className="text-ink/60 mt-3">
            Форманы толтырыңыз, менеджер жақын уақытта байланысады.
          </p>
          <div className="card p-6 mt-8">
            <p className="font-semibold">Қажетті ақпарат</p>
            <ul className="text-ink/60 list-disc pl-5 mt-3 space-y-1">
              <li>Процедураға дейін 24 сағат алкоголь ішпеу ұсынылады.</li>
              <li>Бірінші рет болса, диагностика 15 минут қосылады.</li>
              <li>Қарсы көрсетілім болса, алдын ала ескертіңіз.</li>
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 grid gap-4">
          <label className="text-sm font-medium">Аты-жөні</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-ink/10 px-4 py-2"
          />
          <label className="text-sm font-medium">Телефон</label>
          <input
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+7..."
            className="rounded-xl border border-ink/10 px-4 py-2"
          />
          <label className="text-sm font-medium">Қызмет</label>
          <select
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className="rounded-xl border border-ink/10 px-4 py-2"
          >
            <option value="">Қызметті таңдаңыз</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Күні</label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Уақыты</label>
              <input
                type="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="rounded-xl border border-ink/10 px-4 py-2"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary mt-2">
            Жазылу
          </button>
          {success && (
            <p className="text-sm text-emerald-600">
              Өтініш қабылданды. Жақын арада хабарласамыз!
            </p>
          )}
          {error && <p className="text-sm text-accent">{error}</p>}
        </form>
      </div>
    </section>
  );
}
