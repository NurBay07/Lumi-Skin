export default function Contact() {
  return (
    <section className="section-pad">
      <div className="container-pad grid gap-10 lg:grid-cols-2">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
            Контакт
          </p>
          <h1 className="font-display text-3xl mt-3">Бізбен байланысыңыз</h1>
          <p className="text-ink/60 mt-3">
            Кеңес алу, жазылу немесе қосымша сұрақтарға жауап алу үшін бізге
            хабарласыңыз.
          </p>
          <div className="mt-6 space-y-2 text-ink/70">
            <p>Мекенжай: Алматы, Достық даңғылы 120</p>
            <p>
              Телефон:{" "}
              <a href="tel:+77787275604" className="font-semibold text-ink">
                +7 778 727 5604
              </a>
            </p>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/77787275604"
                className="font-semibold text-ink"
                target="_blank"
                rel="noreferrer"
              >
                +7 778 727 5604
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href="https://instagram.com/lumi.skin"
                className="font-semibold text-ink"
                target="_blank"
                rel="noreferrer"
              >
                @lumi.skin
              </a>
            </p>
            <p>Жұмыс уақыты: Дс-Жм 09:00 - 20:00</p>
          </div>
          <div className="mt-8 space-y-3 text-ink/70">
            <p className="font-semibold text-ink">Жұмыс жасайтын мастерлер</p>
            <p>
              Айгерім Түймебай — Instagram:{" "}
              <a
                href="https://instagram.com/aiigera__"
                className="font-semibold text-ink"
                target="_blank"
                rel="noreferrer"
              >
                @aiigera__
              </a>
            </p>
            <p>
              Жанар Акимбай — Instagram:{" "}
              <a
                href="https://instagram.com/janaraakimbaeva"
                className="font-semibold text-ink"
                target="_blank"
                rel="noreferrer"
              >
                @janaraakimbaeva
              </a>
            </p>
            <p>
              Тоғжан Акимбай — Instagram:{" "}
              <a
                href="https://instagram.com/erketai.00"
                className="font-semibold text-ink"
                target="_blank"
                rel="noreferrer"
              >
                @erketai.00
              </a>
            </p>
          </div>
        </div>
        <div className="card p-2 overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.1367411791676!2d76.95566231548654!3d43.23829367913809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836efb4ac15b2b%3A0xb8c9f2c3e7fddc10!2sDostyk%20Ave%20120!5e0!3m2!1sen!2skz!4v1700000000000!5m2!1sen!2skz"
            className="w-full h-[320px] sm:h-[420px] border-0 rounded-2xl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
