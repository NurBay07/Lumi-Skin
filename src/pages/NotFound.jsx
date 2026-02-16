import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-pad text-center">
        <h1 className="font-display text-4xl">404</h1>
        <p className="text-ink/60 mt-2">Бет табылмады.</p>
        <NavLink to="/" className="btn-primary mt-6 inline-flex">
          Басты бетке қайту
        </NavLink>
      </div>
    </section>
  );
}
