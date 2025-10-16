'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeartbeat, FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import './page.css';

const RedefinirSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (newPassword.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userIndex = users.findIndex((user: any) => user.email === email);

    if (userIndex === -1) {
      alert('Email não encontrado!');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Senha redefinida com sucesso!');

    router.push('/pages/A/login');
  };

  return (
    <div className="pageContainer">
      <div className="card">
        <div className="logoSection">
          <FaHeartbeat className="logoIcon" />
          <span className="logoText">Iron track</span>
        </div>

        <h1 className="title">Redefinir Senha</h1>

        <div className="formGroup">
          <label htmlFor="email" className="label">Email da conta</label>
          <input
            type="email"
            id="email"
            className="inputField"
            placeholder="Digite seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="newPassword" className="label">Nova Senha</label>
          <div className="inputWrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className="inputField"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <span className="togglePassword" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="confirmPassword" className="label">Confirmar Nova Senha</label>
          <div className="inputWrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="inputField"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <span className="togglePassword" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="passwordHint">
          <FaInfoCircle className="infoIcon" />
          <span>A senha deve ter no mínimo 8 caracteres</span>
        </div>

        <button className="submitButton" onClick={handleResetPassword}>
          Redefinir Senha
        </button>

        <button onClick={() => router.push('/pages/A/login')} className="backToLoginLink">
          Voltar ao Login
        </button>

        <p className="helpText">
          Precisa de ajuda? <a href="#" className="contactLink">Entre em contato</a>
        </p>
      </div>
    </div>
  );
};

export default RedefinirSenha;
