import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/home";

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    auth.login({ email });
    navigate(redirectTo, { replace: true });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45 }}>
      <div className="login-wrap">
        <motion.div initial={{ scale: 0.995, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} className="login-card">
          <h2 style={{ marginTop: 0 }}>Entrar no ParkingGo</h2>

          <form onSubmit={handleSubmit}>
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div style={{ marginTop: 12 }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn" type="submit">Entrar</motion.button>
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="text-muted">Não tem conta? <Link to="/cadastro">Cadastre-se</Link></div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
