import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

const links = [
  { to: "/", label: "Басты" },
  { to: "/services", label: "Қызметтер" },
  { to: "/prices", label: "Бағалар" },
  { to: "/about", label: "Біз туралы" },
  { to: "/faq", label: "FAQ" },
  { to: "/reviews", label: "Пікірлер" },
  { to: "/contact", label: "Контакт" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-white/60">
      <div className="container-pad py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="Lumi Skin Clinic" className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.3em] text-ink/60">
              Kosmetology
            </p>
            <p className="font-display text-base sm:text-lg leading-tight">
              Lumi Skin Clinic
            </p>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-ink/70">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-ink ${
                  isActive ? "text-ink font-semibold" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/booking"
            className="btn-primary text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3"
          >
            Онлайн жазылу
          </NavLink>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden rounded-full border border-ink/20 px-3 py-2 text-sm"
            aria-label="Меню"
          >
            {open ? "Жабу" : "Меню"}
          </button>
          <motion.div
            className="hidden md:flex items-center gap-2 text-xs text-ink/60"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="h-2 w-2 rounded-full bg-accent"></span>
            Бүгін ашық: 09:00 - 20:00
          </motion.div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/60 bg-white/90 backdrop-blur">
          <div className="container-pad py-4 flex flex-col gap-3 text-sm font-medium text-ink/70">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `transition hover:text-ink ${
                    isActive ? "text-ink font-semibold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
