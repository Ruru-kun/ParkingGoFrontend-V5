import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

export default function Config() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate("/login", { state: { redirectTo: "/config" } });
    return null;
  }

  function handleLogout() {
    auth.logout();
    navigate("/home", { replace: true });
  }

  function handleGoToFavorite(fav) {
    if (fav && fav.id) {
      navigate(`/horarios/${fav.id}`);
    }
  }

  function handleRemoveFavorite(favId) {
    auth.toggleFavorite(favId);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45 }}>
      <div style={{ padding: 20, maxWidth: 900, margin: "18px auto" }}>
        <h1 style={{ fontWeight: 900 }}>Configurações</h1>

        <motion.div initial={{ scale: 0.99, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.06 }} className="plan-card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 800 }}>Informações da conta</div>
          <div style={{ marginTop: 8 }}>Email: <strong>{auth.user?.email}</strong></div>

          <div style={{ marginTop: 12 }}>
            <motion.button whileHover={{ scale: 1.03 }} className="btn" onClick={handleLogout} style={{ background: "#ff6b6b" }}>Sair da conta</motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.99, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.12 }} className="plan-card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 800 }}>Meus favoritos</div>

          <div style={{ marginTop: 8 }}>
            {(!auth.favorites || auth.favorites.length === 0) && <div className="text-muted">Você não tem favoritos ainda.</div>}

            {auth.favorites && auth.favorites.length > 0 && (
              <motion.div layout style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {auth.favorites.map((f, i) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, borderRadius: 8, background: "#fff8e6" }}
                  >
                    <div>
                      <div style={{ fontWeight: 800 }}>{f.meta?.name || f.id}</div>
                      {f.meta?.address && <div style={{ color: "#666", marginTop: 6 }}>{f.meta.address}</div>}
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <motion.button whileHover={{ scale: 1.03 }} className="btn" onClick={() => handleGoToFavorite(f)} style={{ background: "#4da6ff" }}>Ir</motion.button>
                      <motion.button whileHover={{ scale: 1.03 }} className="btn" onClick={() => handleRemoveFavorite(f.id)} style={{ background: "#ccc", color: "#111" }}>Remover</motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
