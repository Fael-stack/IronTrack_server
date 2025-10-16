'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="headerLeft">
        <span className="headerLogoText">Iron Track</span>
      </div>

      <nav className="headerNav">
        <ul className="navList">
          <li>
            <Link href="/pages/casa" className="navLink">Home</Link>
          </li>
          <li>
            <Link href="/pages/treino" className="navLink">Treinos</Link>
          </li>
          <li>
            <Link href="/pages/dieta" className="navLink activeLink">Dieta</Link>
          </li>
          <li>
            <Link href="/pages/account_settings" className="navLink">Perfil</Link>
          </li>
        </ul>
      </nav>

      <div className="headerRight">
        <div className="headerAvatarPlaceholder"></div>
        <div className="headerOtherAvatar"></div>
      </div>
    </header>
  );
}
