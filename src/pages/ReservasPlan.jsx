import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import colors from '../theme/colors';

export default function ReservasPlan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const plan = (state && state.plan) || new URLSearchParams(window.location.search).get('plan') || 'FREE';

  return (
    <div>
      <h2 style={{ fontSize:20, fontWeight:900 }}>Reservas — {plan}</h2>

      <div style={{ marginTop:16 }}>
        {plan === 'FREE' && (
          <>
            <div className="card">
              <div style={{ fontWeight:800 }}>Plano Free</div>
              <p style={{ marginTop:8 }}>Você verá anúncios e terá limite de reservas mensais.</p>
              <div style={{ marginTop:12 }}>
                <Button onClick={() => navigate('/planos')}>Upgrade para VIP</Button>
              </div>
            </div>
          </>
        )}

        {plan === 'VIP' && (
          <div className="card">
            <div style={{ fontWeight:800 }}>Plano VIP</div>
            <p style={{ marginTop:8 }}>Sem anúncios, reserva priorizada.</p>
            <div style={{ marginTop:12 }}>
              <Button onClick={() => navigate('/config')}>Gerenciar assinatura</Button>
            </div>
          </div>
        )}

        {plan === 'MVP+' && (
          <div className="card">
            <div style={{ fontWeight:800 }}>MVP+</div>
            <p style={{ marginTop:8 }}>Todos os benefícios e descontos.</p>
            <div style={{ marginTop:12 }}>
              <Button onClick={() => navigate('/config')}>Gerenciar assinatura</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
