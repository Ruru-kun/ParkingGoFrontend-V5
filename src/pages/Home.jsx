import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import parkingImg from "../assets/parking.png";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

const pinIconUrl = "https://cdn-icons-png.flaticon.com/512/684/684908.png";
const customIcon = L.icon({
  iconUrl: pinIconUrl,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function Home() {
  const navigate = useNavigate();
  const center = [-27.6455, -48.6699];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.45 }}
    >
      <div className="page-wrap">
        <section className="hero">
          <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.06, duration: 0.5 }} className="hero-left">
            <h1 className="hero-title">Encontre sua vaga ideal<br />com facilidade.</h1>
            <p className="hero-sub">Estacione com praticidade, segurança e tecnologia.</p>

            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn" onClick={() => navigate("/reservas")}>Buscar!</motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn" onClick={() => navigate("/planos")} style={{ marginLeft: 12 }}>Planos</motion.button>
            </div>
          </motion.div>

          <motion.div initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 0.5 }} className="hero-right" style={{ width: 320, textAlign: "right", minWidth: 200 }}>
            <img src={parkingImg} alt="parking" style={{ maxWidth: "100%", borderRadius: 12 }} />
          </motion.div>
        </section>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16, duration: 0.6 }} className="map-card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Mapa — vagas próximas</div>

          <div className="map-wrapper">
            <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={center} icon={customIcon}>
                <Popup>Exemplo: Continente Shopping — vagas próximas</Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
