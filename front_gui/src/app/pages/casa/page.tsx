//front_gui\src\app\pages\casa\page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const backgroundUrl = "/academia.jpeg";
const Home: React.FC = () => {
  const router = useRouter();
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setUnderline(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h1 style={{
            color: '#fff',
            fontSize: '5vw',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Iron track
          </h1>
          <p style={{
            color: '#fff',
            fontSize: '1.5vw',
            marginTop: '1rem',
            fontWeight: 400,
          }}>
            Perfeito para seus treinos!
          </p>
        </div>
      </section>
      <section
        style={{
          background: '#fff',
          padding: '4rem 2rem 2rem 2rem',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2.3vw',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            O que é o projeto Iron Track?
            <span
              style={{
                position: 'absolute',
                left: 0,
                bottom: -4,
                height: 3,
                width: underline ? '100%' : '0%',
                background: '#1e293b',
                transition: 'width 0.7s cubic-bezier(.4,0,.2,1)',
                borderRadius: 2,
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
          </span>
        </h2>
        <p style={{
          fontSize: '1.1vw',
          maxWidth: 800,
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
        Com o serviço Iron Track, professores podem criar e gerenciar planos de treino e dieta personalizados para seus alunos, enquanto os alunos podem acompanhar seu progresso, acessar seus planos e se comunicar com seus professores, tudo em uma plataforma integrada e fácil de usar.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          marginTop: 'auto',
        }}>
        </div>
      </section>
    </div>
  );
};

export default Home;