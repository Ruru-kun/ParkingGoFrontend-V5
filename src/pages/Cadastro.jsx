import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    auth.login({ email });
    navigate("/home", { replace: true });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45 }}>
      <div className="login-wrap">
        <motion.div initial={{ scale: 0.995, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} className="login-card">
          <h2 style={{ marginTop: 0 }}>Criar conta</h2>

          <form onSubmit={handleSubmit}>
            <input className="input" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="input" placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <div style={{ marginTop: 12 }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn" type="submit">Cadastrar</motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
