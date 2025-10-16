'use client';
import React, { useEffect, useState } from 'react';
import {
  FaHeartbeat,
  FaUser,
  FaShieldAlt,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './page.css';

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/pages/A/criar_conta/professor'); 
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/pages/A/login/professor');
  };

  const toggleMenu = (menuName: string) => {
    if (openMenu === menuName) {
      setOpenMenu(null); // fecha o menu se clicar de novo
    } else {
      setOpenMenu(menuName);
    }
  };

  return (
    <div className="pageContainer">
     
      <main className="mainContent">
        <div className="profileCard">
          <div className="profileInfo">
            <div className="profileAvatar">
              <img src="/path/to/your/profile-avatar.jpg" alt="Profile Avatar" className="profileAvatarImg" />
            </div>
            <div className="profileDetails">
              <h2 className="profileName">
                {user ? `${user.firstName} ${user.lastName}` : 'Carregando...'}
              </h2>
              <p className="profileEmail">{user ? user.email : '---'}</p>
              <span className="premiumBadge">Premium Member</span>
            </div>
          </div>
        </div>

        <div className="settingsCard">
          <h3 className="settingsTitle">Configurações da Conta</h3>
          <ul className="settingsList">

            {/* Informações pessoais */}
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
                  <p><strong>Nome completo:</strong> {user?.firstName} {user?.lastName}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  {/* da pra add mais campos aq depoise */}
                </div>
              )}
            </li>

            {/* Privacidade e segurança */}
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
                  <p>Configurações de privacidade e segurança podem ser gerenciadas aqui.</p>
                  <ul>
                    <li>Alterar senha</li>
                    <li>Autenticação em dois fatores</li>
                    <li>Gerenciar dispositivos conectados</li>
                  </ul>
                </div>
              )}
            </li>

            {/* Notificações - redireciona */}
            <li className="settingsItem">
              <button
                className="settingsLink"
                onClick={() => router.push('/pages/A/notificacoes')}
                style={{ background: 'none', border: 'none' }}
              >
                <div className="settingsLeft">
                  <FaBell className="settingsIcon" />
                  <span>Notificações</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </button>
            </li>

            {/* Ajuda */}
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
                  <p>Precisa de ajuda? Aqui estão algumas perguntas frequentes e contato.</p>
                  <ul>
                    <li>Como redefinir minha senha?</li>
                    <li>Como atualizar meu perfil?</li>
                    <li><a href="mailto:support@irontrack.com">Contato do suporte</a></li>
                  </ul>
                </div>
              )}
            </li>

            {/* bgl de sair */}
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
