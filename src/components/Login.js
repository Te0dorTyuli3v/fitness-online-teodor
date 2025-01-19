import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Състояние за превключване между вход и регистрация

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Грешка при влизане: ${error.message}`);
    } else {
      setMessage('Успешно влизане!');
      onLoginSuccess(user); // Уведомяване за успешен вход
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Грешка при регистрация: ${error.message}`);
    } else {
      setMessage('Регистрацията е успешна! Моля, влезте в профила си.');
      setIsRegistering(false); // Връщане към формата за вход
    }
  };

  return (
    <div className="login-container">
      {!isRegistering ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Вход</h3>
          <input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Вход</button>
          <p>
            Нямате профил?{' '}
            <span
              className="toggle-link"
              onClick={() => setIsRegistering(true)}
            >
              Регистрирайте се
            </span>
          </p>
        </form>
      ) : (
        <form className="login-form" onSubmit={handleSignup}>
          <h3>Регистрация</h3>
          <input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Регистрирай се</button>
          <p>
            Вече имате профил?{' '}
            <span
              className="toggle-link"
              onClick={() => setIsRegistering(false)}
            >
              Влезте
            </span>
          </p>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
