import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const path = location.pathname;
  const isHome = path === "/home" || path === "/";
  const showBack = !isHome;

  function handleConfigClick() {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/config" } });
      return;
    }
    navigate("/config");
  }

  function handleLogout() {
    auth.logout();
    navigate("/home", { replace: true });
  }

  return (
    <motion.header
      className="app-header"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "linear-gradient(90deg, #bfeefc 0%, #9fe0f6 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {showBack ? (
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "#083646",
              padding: "8px 10px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
            }}
            aria-label="Voltar"
          >
            ← Voltar
          </motion.button>
        ) : (
          <div style={{ width: 86 }} />
        )}

        <Link to="/home" style={{ color: "#083646", textDecoration: "none", fontWeight: 900, fontSize: 18 }}>
          PARKING GO
        </Link>
      </div>

      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <motion.span whileHover={{ scale: 1.03 }} style={{ display: "inline-block" }}>
          <Link to="/home" style={{ color: "#083646", textDecoration: "none", fontWeight: 600 }}>
            Home
          </Link>
        </motion.span>

        <motion.span whileHover={{ scale: 1.03 }} style={{ display: "inline-block" }}>
          <Link to="/reservas" style={{ color: "#083646", textDecoration: "none", fontWeight: 600 }}>
            Reservas
          </Link>
        </motion.span>

        <motion.span whileHover={{ scale: 1.03 }} style={{ display: "inline-block" }}>
          <Link to="/planos" style={{ color: "#083646", textDecoration: "none", fontWeight: 600 }}>
            Planos
          </Link>
        </motion.span>

        <motion.button
          onClick={handleConfigClick}
          whileHover={{ scale: 1.03 }}
          style={{
            background: "transparent",
            border: "none",
            color: "#083646",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Config
        </motion.button>

        {auth.isAuthenticated ? (
          <>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#083646", fontWeight: 700 }}>
              {auth.user.email}
            </motion.span>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "none",
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Sair
            </motion.button>
          </>
        ) : (
          <motion.span whileHover={{ scale: 1.03 }}>
            <Link to="/login" style={{ color: "#083646", textDecoration: "none", fontWeight: 700 }}>
              Login
            </Link>
          </motion.span>
        )}
      </nav>
    </motion.header>
  );
}
