import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";

import Home from "./pages/Home";
import Planos from "./pages/Planos";
import Reservas from "./pages/Reservas";
import HorariosPreco from "./pages/HorariosPreco";
import Pagamento from "./pages/Pagamento";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Config from "./pages/Config";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/**
 * App: Header global + rotas com AnimatePresence para transições suaves.
 */
export default function App() {
  const location = useLocation();

  return (
    <div>
      <Header />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/pagamento/:plano" element={<Pagamento />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/horarios/:id" element={<HorariosPreco />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/config" element={<Config />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
