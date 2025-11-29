import React from 'react';

export default function Button({ children, onClick, className = '', style = {}, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${className}`} style={style}>
      {children}
    </button>
  );
}
