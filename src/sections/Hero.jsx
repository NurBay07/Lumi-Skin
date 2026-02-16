import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="bg-hero">
      <div className="container-pad section-pad grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="chip">Сертификатталған клиника</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-4 leading-tight">
            Теріңізді жаңартыңыз. Табиғи сұлулықты ашыңыз.
          </h1>
          <p className="text-ink/70 mt-4 max-w-xl">
            Lumi Skin Clinic — жеке күтім жоспары, стерильді орта және заманауи
            аппараттар. Әр клиентке ерекше көзқарас.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink to="/booking" className="btn-primary">
              Онлайн жазылу
            </NavLink>
            <a href="/#services" className="btn-outline">
              Қызметтер тізімі
            </a>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-ink/60">
            <div>
              <p className="text-2xl font-semibold text-ink">12+</p>
              <p>жыл тәжірибе</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">4.9</p>
              <p>орташа рейтинг</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">1200+</p>
              <p>қанағаттанған клиент</p>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-6 sm:p-8"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
            Бүгінгі ұсыныс
          </p>
          <h3 className="font-display text-xl sm:text-2xl mt-3">
            Тері детоксы + ультрадыбыстық тазалау
          </h3>
          <p className="text-ink/60 mt-2">
            Теріні терең тазартып, жұмсақ жылтыр береді.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-2xl font-semibold">19 000 ₸</p>
            <NavLink to="/booking" className="btn-primary text-sm">
              Жазылу
            </NavLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
