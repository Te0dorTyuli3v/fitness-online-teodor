import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css'; // Импортиране на CSS стиловете

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

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Грешка при регистрация: ${error.message}`);
    } else {
      setMessage('Регистрацията е успешна! Моля, влезте в профила си.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h3>Вход или Регистрация</h3>
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
        <button onClick={handleLogin}>Вход</button>
        <button onClick={handleSignup}>Регистрация</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
