import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { PARKINGS } from "../data/parkings";
import { motion } from "framer-motion";

/** Helper to parse "HH:MM" -> minutes since 00:00 */
function hhmmToMinutes(hhmm) {
  if (!hhmm) return 0;
  const [hh, mm] = hhmm.split(":").map((s) => parseInt(s, 10));
  return hh * 60 + (mm || 0);
}

/** Helper to format minutes -> "H:mm" with decimals hours */
function minutesToHoursStr(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, "0")}`;
}

export default function HorariosPreco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const details = PARKINGS.find((p) => p.id === id) || { name: "Estacionamento", pricePerHour: 6.0, openTime: "07:00", closeTime: "22:00" };

  const openMinutes = hhmmToMinutes(details.openTime);
  const closeMinutes = hhmmToMinutes(details.closeTime);

  // defaults: start = openTime, end = start + 60 (or clamp to close)
  const [start, setStart] = useState(details.openTime);
  const defaultEndMin = Math.min(openMinutes + 60, closeMinutes);
  const defaultEnd = minutesToHoursStr(defaultEndMin);
  const [end, setEnd] = useState(defaultEnd);

  useEffect(() => {
    // re-init when id changes
    setStart(details.openTime);
    const def = minutesToHoursStr(Math.min(openMinutes + 60, closeMinutes));
    setEnd(def);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getTotal() {
    const startMin = hhmmToMinutes(start);
    const endMin = hhmmToMinutes(end);
    const diffMin = Math.max(0, endMin - startMin);
    const hours = diffMin / 60;
    const total = hours * details.pricePerHour;
    return { total: total.toFixed(2), hours, diffMin };
  }

  function handleConfirm() {
    const startMin = hhmmToMinutes(start);
    const endMin = hhmmToMinutes(end);
    if (endMin <= startMin) {
      alert("O horário de término deve ser depois do horário de início.");
      return;
    }
    if (startMin < openMinutes || endMin > closeMinutes) {
      alert(`Reservas só podem ser feitas entre ${details.openTime} e ${details.closeTime}.`);
      return;
    }

    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/horarios/${id}` } });
      return;
    }

    // seguir para pagamento (poderia enviar payload com start/end)
    navigate(`/pagamento/${details.name}`, { state: { start, end, total: getTotal().total } });
  }

  const { total, hours } = getTotal();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ padding: 20, maxWidth: 720, margin: "20px auto" }}>
        <h1 style={{ fontWeight: 900 }}>Reservar — {details.name}</h1>

        <div className="plan-card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 800 }}>{details.name}</div>
          <div style={{ color: "#666", marginTop: 8 }}>Funcionamento: {details.openTime} — {details.closeTime}</div>
          <div style={{ color: "#666", marginTop: 8 }}>Preço por hora: R$ {details.pricePerHour.toFixed(2)}</div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Horário de início</label>
            <input type="time" value={start} min={details.openTime} max={details.closeTime} onChange={(e) => setStart(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #e6e6e6", width: 160 }} />
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Horário de término</label>
            <input type="time" value={end} min={details.openTime} max={details.closeTime} onChange={(e) => setEnd(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #e6e6e6", width: 160 }} />
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 900 }}>Total ({hours.toFixed(2)}h): R$ {total}</div>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
            <button className="btn" onClick={handleConfirm}>Pagar / Confirmar</button>
            <button className="btn" style={{ background: "#ccc", color: "#111" }} onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
