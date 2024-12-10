import React, { useState } from 'react';
import { supabase } from '../supabase'; // Увери се, че Supabase е правилно конфигуриран
import './Register.css'; // Импортирай CSS стилове, ако имаш

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
      setMessage('Регистрацията е успешна! Проверете своя имейл за потвърждение.');
    }
  };

  return (
    <div className="register-container">
      <h3>Регистрация</h3>
      <form onSubmit={handleSignup}>
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
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
