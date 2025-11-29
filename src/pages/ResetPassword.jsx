import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [code, setCode] = useState(''); const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth:480 }}>
      <h2 style={{ fontSize:20, fontWeight:900 }}>Redefinir senha</h2>
      <div style={{ marginTop:12 }}>
        <Input label="Código" value={code} onChange={setCode} />
        <Input label="Nova senha" value={password} onChange={setPassword} type="password" />
        <div style={{ marginTop:12 }}>
          <Button onClick={() => navigate('/login')}>Redefinir</Button>
        </div>
      </div>
    </div>
  );
}
