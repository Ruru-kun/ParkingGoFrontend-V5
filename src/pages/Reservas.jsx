import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

/**
 * Reservas: lista com animações
 */

const MOCK = [
  { id: "1", name: "Continente Shopping", address: "Av. Central, 123", vagas: 12, priceBase: 6.5 },
  { id: "2", name: "Shopping Norte", address: "R. das Flores, 77", vagas: 5, priceBase: 5.0 },
  { id: "3", name: "Estacionamento Central", address: "R. A, 10", vagas: 20, priceBase: 7.0 },
];

export default function Reservas() {
  const navigate = useNavigate();
  const auth = useAuth();

  function handleReserve(id) {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/horarios/${id}` } });
      return;
    }
    navigate(`/horarios/${id}`);
  }

  function handleToggleFavorite(item) {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/reservas" } });
      return;
    }
    auth.toggleFavorite(item.id, { name: item.name, address: item.address });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45 }}>
      <div style={{ padding: 20 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontWeight: 900, textAlign: "center" }}>Vagas disponíveis</h1>

          <div style={{ marginTop: 18 }} className="reservas-list">
            {MOCK.map((item, idx) => {
              const fav = auth.isFavorite(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.45 }}
                  className="plan-card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{item.name}</div>
                    <div style={{ color: "#666", marginTop: 6 }}>{item.address}</div>
                    <div style={{ marginTop: 6, fontWeight: 700 }}>{item.vagas} vagas</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <motion.button
                        onClick={() => handleToggleFavorite(item)}
                        title={fav ? "Remover dos favoritos" : "Favoritar"}
                        initial={{ scale: 1 }}
                        animate={{ scale: fav ? 1.18 : 1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        style={{
                          fontSize: 20,
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: fav ? "#FFB74D" : "#999",
                        }}
                      >
                        {fav ? "★" : "☆"}
                      </motion.button>

                      <div style={{ textAlign: "right", color: "#666" }}>A partir de R$ {item.priceBase.toFixed(2)}</div>
                    </div>

                    <motion.button whileHover={{ scale: 1.03 }} className="btn" onClick={() => handleReserve(item.id)}>Reservar</motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
