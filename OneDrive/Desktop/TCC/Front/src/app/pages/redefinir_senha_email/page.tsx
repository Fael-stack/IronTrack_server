'use client';
import React from 'react';
import { FaHeartbeat, FaEnvelope, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import './page.css'; // Changed to import a global CSS file

const RedefinirSenhaEmail: React.FC = () => { // Renamed component to PascalCase
  return (
    <div className="pageContainer">
      <div className="card">
        <div className="logoSection">
          <FaHeartbeat className="logoIcon" />
          <span className="logoText">Iron track</span>
        </div>

        <h1 className="title">Redefinir Senha</h1>
        <p className="subtitle">
          Insira seu email para enviarmos um link para redefinição da senha
        </p>

        <div className="formGroup">
          <label htmlFor="email" className="label">Endereço de email</label>
          <div className="inputWrapper">
            <FaEnvelope className="inputIcon" />
            <input
              type="email"
              id="email"
              className="inputField"
              placeholder="Insira seu email"
            />
          </div>
        </div>

        <button className="submitButton">
          <FaPaperPlane className="buttonIcon" />
          Enviar link de redefinição
        </button>

        <div className="backToLogin">
          <FaArrowLeft className="backIcon" />
          <a href="#" className="backLink">Voltar ao login</a>
        </div>

        <p className="helpText">
          Precisa de ajuda? <a href="#" className="contactLink">Contate o suporte</a>
        </p>
      </div>
    </div>
  );
};

export default RedefinirSenhaEmail; // Export the renamed component