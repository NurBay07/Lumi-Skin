import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import { fallbackServices } from "../data/fallback.js";

const ServicesContext = createContext(null);

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/services");
      setServices(data);
    } catch (err) {
      setServices(fallbackServices);
      setError("Сервер өшірулі. Демо деректер көрсетілуде.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async (payload) => {
    const { data } = await api.post("/services", payload);
    setServices((prev) => [data, ...prev]);
  };

  const updateService = async (id, payload) => {
    const { data } = await api.put(`/services/${id}`, payload);
    setServices((prev) => prev.map((item) => (item.id === id ? data : item)));
  };

  const deleteService = async (id) => {
    await api.delete(`/services/${id}`);
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  const categories = useMemo(() => {
    const set = new Set(services.map((s) => s.category));
    return ["Барлығы", ...Array.from(set)];
  }, [services]);

  const value = useMemo(
    () => ({
      services,
      loading,
      error,
      categories,
      refresh: fetchServices,
      createService,
      updateService,
      deleteService,
    }),
    [services, loading, error, categories]
  );

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  return useContext(ServicesContext);
}
