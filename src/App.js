// src/App.js
import React, { useState, useEffect } from 'react';

// --- IMPORTANTE: REEMPLAZA 'xxxxxxxxxx' y 'region' con tus valores reales ---
const API_CONFIG = {
  prod: 'https://pq6u2a3ei9.execute-api.us-east-2.amazonaws.com/prot/dev',
  dev: 'https://pq6u2a3ei9.execute-api.us-east-2.amazonaws.com/dev/dev'
};


function App() {
  const [message, setMessage] = useState('Cargando...');
  const [error, setError] = useState(null);

  // Detecta el entorno basado en la URL de Amplify
  const currentEnv = window.location.hostname.includes('-dev') ? 'dev' : 'prod';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONFIG[currentEnv], { method: 'POST' });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setMessage(data.message || 'Respuesta recibida');
      } catch (err) {
        console.error(err);
        setError('Error conectando con el backend');
      }
    };

    fetchData();
  }, [currentEnv]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🌍 Entorno: {currentEnv.toUpperCase()}</h1>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>📢 Respuesta: <strong>{message}</strong></p>}
    </div>
  );
}

export default App;