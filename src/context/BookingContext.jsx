import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings");
      setBookings(data);
    } catch (err) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const createBooking = async (payload) => {
    try {
      const { data } = await api.post("/bookings", payload);
      setBookings((prev) => [data, ...prev]);
      const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
      localStorage.setItem("bookings", JSON.stringify([data, ...stored]));
      return data;
    } catch (err) {
      const fallback = { ...payload, id: Date.now().toString() };
      setBookings((prev) => [fallback, ...prev]);
      const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
      localStorage.setItem("bookings", JSON.stringify([fallback, ...stored]));
      return fallback;
    }
  };

  const value = useMemo(
    () => ({
      bookings,
      loading,
      refresh: fetchBookings,
      createBooking,
    }),
    [bookings, loading]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
