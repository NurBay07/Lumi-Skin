import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "../context/ServicesContext.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Home() {
  const { services } = useServices();
  const featured = services.slice(0, 3);

  return (
    <div>
      <section className="bg-hero">
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
              <NavLink to="/services" className="btn-outline">
                Қызметтер тізімі
              </NavLink>
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

      <section className="section-pad">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
              Клиника туралы
            </p>
            <h2 className="font-display text-3xl mt-4">
              Теріңіздің денсаулығы — біздің басты мақсатымыз
            </h2>
            <p className="text-ink/60 mt-4">
              Әр процедура медициналық стандартқа сай жасалады. Біз
              лицензияланған құрал-жабдықтар, стерильділік және қауіпсіз
              әдістерді қолданамыз.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">Лицензия</span>
              <span className="chip">Стерильділік</span>
              <span className="chip">FDA аппараттар</span>
              <span className="chip">Жеке жоспар</span>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Тәжірибелі мамандар",
                text: "12 жылдан астам тәжірибе, халықаралық сертификаттар.",
              },
              {
                title: "Стерильді орта",
                text: "Әр құрал ультрадыбыстық және автоклавтық өңдеуден өтеді.",
              },
              {
                title: "Қауіпсіз әдістер",
                text: "Процедура алдында диагностика және консультация міндетті.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-ink/60 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/60">
        <div className="container-pad">
          <div className="mb-10">
            <p className="uppercase tracking-[0.3em] text-xs text-ink/50">
              Танымал
            </p>
            <h2 className="font-display text-3xl md:text-4xl mt-2">
              Клиенттер жиі таңдайтын қызметтер
            </h2>
            <p className="text-ink/60 mt-3 max-w-2xl">
              Әр қызмет жеке сипаттама және қауіпсіздік хаттамасымен беріледі.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-8">
            <NavLink to="/services" className="btn-outline">
              Барлық қызметтер
            </NavLink>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-pad card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-ink/60">
              Жедел жазылу
            </p>
            <h3 className="font-display text-2xl mt-2">
              Жаңа клиенттерге арналған алғашқы консультация тегін
            </h3>
          </div>
          <NavLink to="/booking" className="btn-primary">
            Консультация алу
          </NavLink>
        </div>
      </section>

      <section className="section-pad bg-white/60">
        <div className="container-pad">
          <p className="uppercase tracking-[0.3em] text-xs text-ink/50">
            Instagram
          </p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            Соңғы шабыттар (demo)
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Сарысу + пилинг",
                src: "https://cdn.pixabay.com/photo/2020/08/30/15/03/facial-treatment-5529815_1280.jpg",
              },
              {
                title: "Hydra glow",
                src: "https://cdn.pixabay.com/photo/2018/02/09/15/00/woman-3141766_1280.jpg",
              },
              {
                title: "Лазерлік жасарту",
                src: "https://cdn.pixabay.com/photo/2021/07/20/06/34/woman-6479874_640.jpg",
              },
              {
                title: "Тері детоксы",
                src: "https://cdn.pixabay.com/photo/2016/06/16/14/37/skincare-1461395_640.jpg",
              },
              {
                title: "Акне терапиясы",
                src: "https://cdn.pixabay.com/photo/2020/08/30/14/57/beautician-5529805_640.jpg",
              },
              {
                title: "Лифтинг массаж",
                src: "https://cdn.pixabay.com/photo/2018/11/20/00/05/facial-cleansing-3826286_1280.jpg",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card p-0 overflow-hidden min-h-[180px] sm:min-h-[220px] lg:min-h-[260px]"
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.src})` }}
                >
                  <div className="h-full w-full bg-gradient-to-t from-night/70 via-night/20 to-transparent p-5 flex items-end">
                    <div className="w-full text-white">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        @lumi.skin
                      </p>
                      <p className="font-semibold mt-2">{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://instagram.com/lumi.skin"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Instagram ашу
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
