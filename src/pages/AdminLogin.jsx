import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const ok = login(pin);
    if (!ok) {
      setError("PIN қате. Demo PIN: 1234");
      return;
    }
    navigate("/admin");
  };

  return (
    <section className="section-pad">
      <div className="container-pad max-w-lg">
        <div className="card p-8">
          <h1 className="font-display text-2xl">Админ кіру</h1>
          <p className="text-ink/60 mt-2">
            Demo режим: PIN `1234`
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <input
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="PIN енгізіңіз"
              className="rounded-xl border border-ink/10 px-4 py-2"
              required
            />
            <button className="btn-primary" type="submit">
              Кіру
            </button>
            {error && <p className="text-accent text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
