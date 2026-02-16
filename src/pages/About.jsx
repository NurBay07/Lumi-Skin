import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import { api } from "../lib/api.js";
import { fallbackGallery } from "../data/fallback.js";

export default function About() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setGallery(res.data))
      .catch(() => setGallery(fallbackGallery));
  }, []);

  return (
    <section className="section-pad">
      <div className="container-pad">
        <SectionHeader
          eyebrow="Біз туралы"
          title="Косметологтың портфолиосы және сертификаттары"
          subtitle="Жеке тәсіл, қауіпсіз протоколдар және халықаралық тәжірибе."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card p-8">
            <h3 className="font-semibold text-xl">Айгерім Түймебай</h3>
            <p className="text-ink/60 mt-2">
              12 жылдық тәжірибесі бар дәрігер-косметолог. Дерматология және
              эстетикалық медицина бойынша халықаралық сертификаттарға ие.
            </p>
            <ul className="mt-4 text-ink/70 list-disc pl-5 space-y-1">
              <li>DermaTech Certification (Korea)</li>
              <li>Laser Safety Pro (Germany)</li>
              <li>Advanced Injectable Course (UAE)</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">Сертификат №A-2024</span>
              <span className="chip">Лицензия №KZ-9981</span>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Тері диагностикасы",
                text: "Құрылғылық сканерлеу арқылы жеке жоспар құрылады.",
              },
              {
                title: "Нәтижеге бағытталған күтім",
                text: "Құрамдары клиникалық дәлелденген өнімдер.",
              },
              {
                title: "Стерильді хаттама",
                text: "Әр процедура алдында құралдар толық өңделеді.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-ink/60 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow="Before / After"
            title="Нәтиже галереясы"
            subtitle="Демо-сынамалар, нақты клиенттерге ұқсас нәтижелер."
          />
          <GalleryGrid items={gallery} />
        </div>

        <div className="mt-16">
          <SectionHeader
            eyebrow="Команда"
            title="Мамандар құрамы"
            subtitle="Әр маман жеке бағыт пен протоколға жауап береді."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Айгерім Түймебай",
                role: "Дәрігер‑косметолог",
                insta: "@aiigera__",
              },
              {
                name: "Жанар Акимбай",
                role: "Эстетист‑массажист",
                insta: "@janaraakimbaeva",
              },
              {
                name: "Тоғжан Акимбай",
                role: "Лазер маманы",
                insta: "@erketai.00",
              },
            ].map((member) => (
              <div key={member.name} className="card p-6">
                <div className="h-16 w-16 rounded-full bg-rose/30 mb-4"></div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-ink/60 text-sm">{member.role}</p>
                <p className="text-ink/60 text-sm mt-2">
                  Instagram: {member.insta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
