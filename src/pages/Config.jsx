import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { motion } from "framer-motion";

export default function Config() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/config" } });
      return;
    }
    setName(auth.user?.name || "");
    setEmail(auth.user?.email || "");
  }, [auth, navigate]);

  if (!auth.isAuthenticated) return null;

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    // call updateProfile
    const resp = auth.updateProfile({ name: name.trim(), email: email.trim(), password: password });
    setSaving(false);
    if (!resp.ok) {
      alert(resp.message || "Erro ao atualizar perfil.");
      return;
    }
    alert("Perfil atualizado com sucesso.");
    setPassword("");
  }

  function handleLogout() {
    auth.logout();
    navigate("/home", { replace: true });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div style={{ padding: 20, maxWidth: 900, margin: "18px auto" }}>
        <h1 style={{ fontWeight: 900 }}>Configurações</h1>

        <motion.div className="plan-card" style={{ marginTop: 12 }} initial={{ scale: 0.995, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div style={{ fontWeight: 800 }}>Informações da conta</div>
          <div style={{ marginTop: 8 }}>ID da conta: <strong>{auth.user?.id}</strong></div>

          <form onSubmit={handleSave} style={{ marginTop: 12 }}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Nome</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Email</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Nova senha (opcional)</label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button>
              <button type="button" className="btn" style={{ background: "#ff6b6b" }} onClick={handleLogout}>Sair da conta</button>
            </div>
          </form>
        </motion.div>

        <motion.div className="plan-card" style={{ marginTop: 12 }} initial={{ scale: 0.995, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div style={{ fontWeight: 800 }}>Meus favoritos</div>

          <div style={{ marginTop: 8 }}>
            {(!auth.favorites || auth.favorites.length === 0) && <div className="text-muted">Você não tem favoritos ainda.</div>}

            {auth.favorites && auth.favorites.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {auth.favorites.map((f) => (
                  <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, borderRadius: 8, background: "#fff8e6" }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{f.meta?.name || f.id}</div>
                      {f.meta?.address && <div style={{ color: "#666", marginTop: 6 }}>{f.meta.address}</div>}
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => navigate(`/horarios/${f.id}`)} style={{ background: "#4da6ff" }}>Ir</button>
                      <button className="btn" onClick={() => auth.toggleFavorite(f.id)} style={{ background: "#ccc", color: "#111" }}>Remover</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
