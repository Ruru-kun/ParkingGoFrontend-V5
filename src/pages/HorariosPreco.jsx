import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

const mockDetails = {
  1: { name: "Continente Shopping", pricePerHour: 6.5 },
  2: { name: "Shopping Norte", pricePerHour: 5.0 },
  3: { name: "Estacionamento Central", pricePerHour: 7.0 },
};

export default function HorariosPreco() {
  const { id } = useParams();
  const details = mockDetails[id] || { name: "Estacionamento", pricePerHour: 6.0 };
  const [hours, setHours] = useState(1);
  const navigate = useNavigate();
  const auth = useAuth();

  function handleConfirm() {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/horarios/${id}` } });
      return;
    }
    navigate(`/pagamento/${details.name}`);
  }

  const total = (details.pricePerHour * hours).toFixed(2);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45 }}>
      <div style={{ padding: 20, maxWidth: 720, margin: "20px auto" }}>
        <h1 style={{ fontWeight: 900 }}>Reservar — {details.name}</h1>

        <div className="plan-card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 800 }}>{details.name}</div>
          <div style={{ color: "#666", marginTop: 8 }}>Preço por hora: R$ {details.pricePerHour.toFixed(2)}</div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Quantas horas?</label>
            <input
              type="number"
              min={1}
              value={hours}
              onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #e6e6e6", width: 120 }}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 900 }}>Total: R$ {total}</div>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            <motion.button whileHover={{ scale: 1.03 }} className="btn" onClick={handleConfirm}>Pagar / Confirmar</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} className="btn" style={{ background: "#ccc", color: "#111" }} onClick={() => navigate(-1)}>Cancelar</motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
