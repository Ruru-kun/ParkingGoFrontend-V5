import React from 'react';

export default function AdBanner({ text = 'Anúncio: vagas próximas!' }) {
  return (
    <div style={{
      background:'#F1F2F4', padding:12, borderRadius:10, textAlign:'center', margin:'10px 0', fontWeight:700
    }}>
      {text}
    </div>
  );
}
