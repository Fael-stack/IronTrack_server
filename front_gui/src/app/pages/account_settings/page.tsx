// front_gui/src/app/pages/account_settings/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  FaHeartbeat, FaUser, FaCamera, FaShieldAlt, FaBell,
  FaQuestionCircle, FaSignOutAlt,
  FaChevronRight, FaChevronDown
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './page.css';

interface Usuario {
  id: string;
  name?: string;
  nome?: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  phone?: string;
}

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [userType, setUserType] = useState<'aluno' | 'treinador' | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedAvatar = sessionStorage.getItem("avatarUrl");
    if (storedAvatar) setAvatarUrl(storedAvatar);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      sessionStorage.setItem("avatarUrl", base64);
      setAvatarUrl(base64);
    };

    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        router.push('/pages/login/treinador');
        return;
      }

      try {
        const res = await fetch('http://localhost:4000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userType');
          router.push('/pages/login/treinador');
          return;
        }

        const data = await res.json();
        const role = data.role;
        const u = data.user;

        if (role === 'aluno' || role === 'Aluno') {
          setUser({
            id: u._id || u.id,
            name: u.name || u.nome,
            email: u.email,
            age: u.age,
            weight: u.weight,
            height: u.height,
            phone: u.phone,
          });
          setUserType('aluno');
        } else {
          setUser({
            id: u._id || u.id,
            name: u.name || u.nome,
            email: u.email,
            phone: u.phone,
          });
          setUserType('treinador');
        }
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        router.push('/pages/login/treinador');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('avatarUrl');
    router.push('/pages/login/treinador');
  };

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  if (loading) {
    return <div className="pageContainer"><p style={{ textAlign: 'center' }}>Carregando...</p></div>;
  }

  return (
   <div className="pageContainer">
      <main className="mainContent">
        <div className="profileCard">
          <div className="profileInfo">

            
            <div className="profilePictureWrapper">
              <div className="profileAvatar">
                <img
                  src={avatarUrl}
                  alt="Profile Avatar"
                  className="profileAvatarImg"
                  onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
                />
              </div>

              
              <button
                type="button"
                className="cameraButtonFixed"
                onClick={openFilePicker}
                aria-label="Alterar foto de perfil"
              >
                <FaCamera />
              </button>
              <input
                id="avatarUpload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>

            
            <div className="profileDetails">
              <h2 className="profileName">
                {user ? user.name : 'Carregando...'}
              </h2>
              <p className="profileEmail">{user?.email ?? '---'}</p>
              <span className="premiumBadge">
                {userType === 'aluno' ? 'Aluno Premium' : 'Treinador Pro'}
              </span>
            </div>

          </div>
        </div>

        
        <div className="settingsCard">
          <h3 className="settingsTitle">Configurações da Conta</h3>
          <ul className="settingsList">

            
            <li className="settingsItem">
              <button
                className="settingsLink"
                onClick={() => toggleMenu('personalInfo')}
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaUser className="settingsIcon" />
                  <span>Informações pessoais</span>
                </div>
                {openMenu === 'personalInfo' ? (
                  <FaChevronDown className="settingsArrow" />
                ) : (
                  <FaChevronRight className="settingsArrow" />
                )}
              </button>
              {openMenu === 'personalInfo' && (
                <div className="submenuContent">
                  <p><strong>Nome:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  {userType === 'aluno' && (
                    <>
                      <p><strong>Idade:</strong> {user?.age ?? '—'}</p>
                      <p><strong>Peso:</strong> {user?.weight ?? '—'}</p>
                      <p><strong>Altura:</strong> {user?.height ?? '—'}</p>
                    </>
                  )}
                  <p><strong>Telefone:</strong> {user?.phone ?? '—'}</p>
                </div>
              )}
            </li>

            
            <li className="settingsItem">
              <button
                className="settingsLink"
                onClick={() => toggleMenu('privacy')}
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaShieldAlt className="settingsIcon" />
                  <span>Privacidade e segurança</span>
                </div>
                {openMenu === 'privacy' ? (
                  <FaChevronDown className="settingsArrow" />
                ) : (
                  <FaChevronRight className="settingsArrow" />
                )}
              </button>
              {openMenu === 'privacy' && (
                <div className="submenuContent">
                  <p>Gerencie suas configurações de privacidade:</p>
                  <ul>
                    <li>Alterar senha</li>
                    <li>Autenticação em dois fatores</li>
                    <li>Gerenciar dispositivos conectados</li>
                  </ul>
                </div>
              )}
            </li>
            <li className="settingsItem">
              <button
                className="settingsLink"
                onClick={() => router.push('/pages/notificacoes')}
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaBell className="settingsIcon" />
                  <span>Notificações</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </button>
            </li>

            
            <li className="settingsItem">
              <button
                className="settingsLink"
                onClick={() => toggleMenu('help')}
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaQuestionCircle className="settingsIcon" />
                  <span>Ajuda</span>
                </div>
                {openMenu === 'help' ? (
                  <FaChevronDown className="settingsArrow" />
                ) : (
                  <FaChevronRight className="settingsArrow" />
                )}
              </button>
              {openMenu === 'help' && (
                <div className="submenuContent">
                  <p>Precisa de ajuda? Aqui estão algumas opções:</p>
                  <ul>
                    <li>Como redefinir minha senha?</li>
                    <li>Como atualizar meu perfil?</li>
                    <li>
                      <a href="mailto:support@irontrack.com">Contato do suporte</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="settingsItem">
              <button
                onClick={handleLogout}
                className="settingsLink"
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaSignOutAlt className="settingsIcon" />
                  <span>Sair</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
