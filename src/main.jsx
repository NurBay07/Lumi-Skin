import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import "./index.css";
import { ServicesProvider } from "./context/ServicesContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ServicesProvider>
        <BookingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BookingProvider>
      </ServicesProvider>
    </AuthProvider>
  </StrictMode>
);
