import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * Pagamento: se não estiver logado redireciona para login (com redirect)
 * Rota: /pagamento/:plano
 */

export default function Pagamento() {
  const { plano } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/pagamento/${plano}` } });
    }
  }, [auth, navigate, plano]);

  function handleSubmit(e) {
    e.preventDefault();
    // integrar com backend / pagamentos aqui
    alert(`Pagamento simulado para ${plano}. Obrigado!`);
    navigate("/home");
  }

  return (
    <div style={{ padding: 20, maxWidth: 680, margin: "20px auto" }}>
      <h1 style={{ fontWeight: 900 }}>Pagamento — {plano}</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Nome no cartão</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome completo" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e6e6" }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Número do cartão</label>
          <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="1234 1234 1234 1234" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e6e6" }} />
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>Validade</label>
            <input value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="MM/AA" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e6e6" }} />
          </div>

          <div style={{ width: 120 }}>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>CVV</label>
            <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e6e6" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" className="btn">Confirmar pagamento</button>
          <button type="button" onClick={() => navigate(-1)} className="btn" style={{ background: "#ccc", color: "#111" }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
