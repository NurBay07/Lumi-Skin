export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/70">
      <div className="container-pad py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg">Lumi Skin Clinic</p>
          <p className="text-ink/60 mt-2">
            Косметология клиникасы. Табиғи сұлулықты заманауи технологиямен
            үйлестіреміз.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Байланыс</p>
          <p className="text-ink/60">Алматы, Достық даңғылы 120</p>
          <p className="text-ink/60">
            <a href="tel:+77787275604" className="font-semibold text-ink">
              +7 778 727 5604
            </a>
          </p>
          <p className="text-ink/60">
            <a
              href="https://wa.me/77787275604"
              className="font-semibold text-ink"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p className="text-ink/60">
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
          <p className="text-ink/60">
            <a
              href="https://maps.app.goo.gl/"
              className="font-semibold text-ink"
              target="_blank"
              rel="noreferrer"
            >
              Картаға өту
            </a>
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Жұмыс уақыты</p>
          <p className="text-ink/60">Дс-Жм: 09:00 - 20:00</p>
          <p className="text-ink/60">Сб: 10:00 - 18:00</p>
          <p className="text-ink/60">Жс: Демалыс</p>
        </div>
      </div>
      <div className="text-center text-xs text-ink/50 pb-6">
        © 2026 Lumi Skin Clinic. Барлық құқықтар қорғалған.
      </div>
    </footer>
  );
}
