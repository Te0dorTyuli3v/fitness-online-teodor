import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css'; // CSS за стилизиране

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false); // Управление на формуляра за смяна на парола
  const [newPassword, setNewPassword] = useState(''); // Поле за новата парола

  // Функция за вход
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
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

  // Функция за смяна на паролата
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!newPassword) {
      setMessage('Моля, въведете нова парола.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(`Грешка при смяна на паролата: ${error.message}`);
    } else {
      setMessage('Паролата е променена успешно!');
      setShowChangePassword(false); // Скриване на формуляра след успешна промяна
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
      </form>

      {/* Съобщение за потребителя */}
      {message && <p className="message">{message}</p>}

      {/* Бутон за смяна на паролата */}
      <button
        className="change-password-button"
        onClick={() => setShowChangePassword(!showChangePassword)}
      >
        Смяна на паролата
      </button>

      {/* Форма за смяна на паролата */}
      {showChangePassword && (
        <form className="change-password-form" onSubmit={handlePasswordChange}>
          <h3>Смяна на паролата</h3>
          <input
            type="password"
            placeholder="Нова парола"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Промени паролата</button>
        </form>
      )}
    </div>
  );
}

export default Login;
