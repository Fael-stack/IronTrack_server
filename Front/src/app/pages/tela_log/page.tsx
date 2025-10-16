"use client";
import React, { useEffect, useState } from "react";
import "./page.css";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

const UsuariosLogados: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:4000/usuarios-logados");
        if (!response.ok) throw new Error("Erro ao buscar usuários.");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErrorMessage("Não foi possível carregar os usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="container">
      <main className="usuariosContainer">
        <h2>Usuários Logados</h2>
        <p>Veja todos os usuários que estão ativos no momento.</p>

        {loading && <p className="loading">Carregando...</p>}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        {!loading && !errorMessage && usuarios.length === 0 && (
          <p className="emptyMessage">Nenhum usuário logado no momento.</p>
        )}

        {!loading && usuarios.length > 0 && (
          <div className="usuariosGrid">
            {usuarios.map((usuario) => (
              <div key={usuario.id} className="usuarioCard">
                <div className="avatar">{usuario.nome[0]}</div>
                <div className="usuarioInfo">
                  <p className="usuarioNome">{usuario.nome}</p>
                  <p className="usuarioEmail">{usuario.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 Fit Track. Todos os direitos reservados.</p>
        <div className="socialIcons">⚫ ⚫ ⚫</div>
      </footer>
    </div>
  );
};

export default UsuariosLogados;
