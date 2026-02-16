import { NavLink } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="chip">{service.category}</span>
        <span className="text-sm text-ink/60">{service.duration}</span>
      </div>
      <div>
        <h3 className="font-semibold text-lg">{service.name}</h3>
        <p className="text-ink/60 mt-2">{service.shortDesc}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
        <p className="font-semibold text-ink">{service.price}</p>
        <div className="flex items-center gap-2">
          <NavLink to={`/services/${service.id}`} className="btn-outline text-sm">
            Толығырақ
          </NavLink>
          <NavLink to="/booking" className="btn-primary text-sm">
            Жазылу
          </NavLink>
        </div>
      </div>
    </div>
  );
}
