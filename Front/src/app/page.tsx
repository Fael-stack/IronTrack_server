'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Bem-vindo ao IronTrack 🏋️‍♂️</h1>
        <p>
          Melhore sua qualidade de vida com treinos e dietas personalizados criados por treinadores de todo o país.
        </p>
        <div className={styles.buttons}>
          <Link href="/pages/login/aluno" className={styles.button}>
            Entrar como Aluno
          </Link>
          <Link href="/pages/login/treinador" className={styles.buttonOutline}>
            Entrar como Treinador
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2>O que você encontra aqui:</h2>
        <ul>
          <li>📈 Acompanhamento de treinos e progresso</li>
          <li>🥗 Planejamento alimentar personalizado</li>
          <li>💬 Comunicação direta entre aluno e treinador</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} IronTrack — Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
