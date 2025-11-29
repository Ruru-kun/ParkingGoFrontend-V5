import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth:480 }}>
      <h2 style={{ fontSize:20, fontWeight:900 }}>Recuperar senha</h2>
      <div style={{ marginTop:12 }}>
        <Input label="Email" value={email} onChange={setEmail} placeholder="seu@exemplo.com" />
        <div style={{ marginTop:12 }}>
          <Button onClick={() => navigate('/reset')}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
