import React, { useState } from 'react';
import { supabase } from '../supabase';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setMessage('Моля, въведете нова парола.');
      return;
    }

    try {
      // Проверка дали потребителят е влязъл
      const user = supabase.auth.user();
      if (!user) {
        setMessage('Не сте влезли в профила си.');
        return;
      }

      // Актуализиране на паролата
      const { error } = await supabase.auth.update({
        password: newPassword,
      });

      if (error) {
        setMessage(`Грешка при промяна на паролата: ${error.message}`);
      } else {
        setMessage('Паролата е променена успешно!');
      }
    } catch (error) {
      setMessage(`Грешка: ${error.message}`);
    }
  };

  return (
    <div className="change-password-container">
      <h3>Смяна на паролата</h3>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Нова парола"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Промени паролата</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
