// src/data/parkings.js
// Lista centralizada de estacionamentos com horário de funcionamento (open/close: "HH:MM")
// pricePerHour: número (R$ por hora)

export const PARKINGS = [
  {
    id: "1",
    name: "Continente Shopping",
    address: "Av. Central, 123",
    vagas: 12,
    pricePerHour: 6.5,
    openTime: "07:00",
    closeTime: "23:00",
    lat: -27.6455,
    lng: -48.6699
  },
  {
    id: "2",
    name: "Shopping Norte",
    address: "R. das Flores, 77",
    vagas: 5,
    pricePerHour: 5.0,
    openTime: "08:00",
    closeTime: "22:00",
    lat: -27.6430,
    lng: -48.6710
  },
  {
    id: "3",
    name: "Estacionamento Central",
    address: "R. A, 10",
    vagas: 20,
    pricePerHour: 7.0,
    openTime: "06:00",
    closeTime: "23:59",
    lat: -27.6470,
    lng: -48.6670
  }
];
