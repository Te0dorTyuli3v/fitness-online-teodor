import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css'; // Импортиране на стиловете

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Грешка при влизане: ${error.message}`);
    } else {
      setMessage('Успешно влизане!');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Вход</h3>
        <input
          type="email"
          placeholder="Имейл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Вход</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;


