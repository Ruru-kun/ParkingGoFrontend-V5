import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/**
 * Planos: FREE já está ativo por padrão (removi botão "Assinar").
 * Para VIP / MVP+, exige login antes de ir para pagamento.
 */

export default function Planos() {
  const navigate = useNavigate();
  const auth = useAuth();

  const planos = [
    { id: "FREE", title: "FREE", desc: "Com anúncios, reservas limitadas.", price: 0 },
    { id: "VIP", title: "VIP", desc: "Sem anúncios, reservas prioritárias.", price: 9.9 },
    { id: "MVP+", title: "MVP+", desc: "Benefícios extras e descontos.", price: 19.9 },
  ];

  function handleChoose(planId) {
    // FREE is default active - no signup button
    if (planId === "FREE") {
      // talvez informar que já está ativo
      alert("Plano FREE já está ativo na sua conta por padrão.");
      return;
    }

    // if not logged in -> go to login with redirect
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/pagamento/${planId}` } });
      return;
    }

    // logged in -> go to payment
    navigate(`/pagamento/${planId}`);
  }

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "18px auto" }}>
      <h1 style={{ fontWeight: 900 }}>Planos</h1>

      <div className="plan-list">
        {planos.map((p) => (
          <div className="plan-card" key={p.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{p.title}</div>
                <div style={{ color: "#556070", marginTop: 6 }}>{p.desc}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{p.price === 0 ? "Grátis" : `R$ ${p.price.toFixed(2)}`}</div>
                <div style={{ marginTop: 8 }}>
                  {p.id === "FREE" ? (
                    <button className="btn" onClick={() => handleChoose(p.id)} style={{ background: "#a0bfcf" }}>
                      Plano Ativo
                    </button>
                  ) : (
                    <button className="btn" onClick={() => handleChoose(p.id)}>
                      Assinar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
