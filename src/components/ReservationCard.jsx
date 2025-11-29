import React from "react";

/**
 * ReservationCard: componente simples
 * props: { id, name, address, vagas, priceBase, onReserve }
 */
export default function ReservationCard({ id, name, address, vagas, priceBase, onReserve }) {
  return (
    <div className="card" style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{name}</div>
          <div style={{ color: "#666", marginTop: 6 }}>{address}</div>
          <div style={{ marginTop: 6, fontWeight: 700 }}>{vagas} vagas</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: 8, color: "#666" }}>A partir de R$ {priceBase.toFixed(2)}</div>
          <button className="btn" onClick={() => onReserve(id)}>Reservar</button>
        </div>
      </div>
    </div>
  );
}
