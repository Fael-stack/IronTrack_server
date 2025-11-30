"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import io from "socket.io-client";
import styles from "./page.module.css";

interface Usuario {
  _id: string;
  nome?: string;
  name?: string;
}

interface Remetente {
  _id: string;
  nome?: string;
  name?: string;
}

interface Mensagem {
  _id?: string;
  conteudo: string;
  remetente: Remetente | string;
  remetenteModel: "Aluno" | "Treinador";
  horario?: string;
  data?: string;
}

interface Contrato {
  _id: string;
  aluno: Usuario | string | null;
  treinador: Usuario | string | null;
  status: string;
  offer?: { _id?: string; titulo?: string; descricao?: string };
}

const socket = io("http://localhost:4000");

export default function ChatWhatsApp() {
  const router = useRouter();
  const { id } = useParams();

  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [nomeOutroUsuario, setNomeOutroUsuario] = useState("");
  const extractId = (maybe: any): string | null => {
    if (!maybe) return null;
    if (typeof maybe === "string") {
      const t = maybe.trim();
      return t || null;
    }
    if (maybe._id) return String(maybe._id);
    if (maybe.id) return String(maybe.id);
    return null;
  };
  const sameId = (a: any, b: any) => {
    const A = extractId(a);
    const B = extractId(b);
    if (!A || !B) return false;
    return String(A).trim() === String(B).trim();
  };

  useEffect(() => {
    const rawUserId = typeof window !== "undefined" ? sessionStorage.getItem("userId") : null;
    const rawRole = typeof window !== "undefined"
      ? (sessionStorage.getItem("role") || sessionStorage.getItem("userType"))
      : null;

    setUserId(rawUserId ? String(rawUserId).trim() : null);
    setRole(rawRole ? String(rawRole).trim() : null);
  }, []);

  useEffect(() => {
    if (!userId || !role) {
      setContratos([]);
      return;
    }

    const buscar = async () => {
      try {
        const res = await axios.get<Contrato[]>("http://localhost:4000/contracts");
        const roleNorm = String(role).trim().toLowerCase();
        const uid = String(userId).trim();
        console.debug("[chat] fetched contracts:", res.data, { role, roleNorm, userId: uid });

        const filtrados = res.data.filter(c => {
          const alunoId = extractId(c.aluno);
          const treinadorId = extractId(c.treinador);

          if (roleNorm === "aluno") {
            return alunoId === uid;
          } else if (roleNorm === "treinador" || roleNorm === "trainer") {
            return treinadorId === uid;
          } else {
            // fallback: retorna contratos onde userId aparece em aluno ou treinador
            return alunoId === uid || treinadorId === uid;
          }
        });

        setContratos(filtrados);
      } catch (err) {
        console.error("Erro ao buscar contratos para sidebar:", err);
        setContratos([]);
      }
    };

    buscar();
  }, [userId, role]);

  useEffect(() => {
    if (!id) return;

    const carregar = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/chats/contract/${id}`);
        setMensagens(res.data.mensagens || []);
      } catch (err) {
        console.warn("Chat não encontrado ou erro ao carregar mensagens:", err);
        setMensagens([]);
      }
    };

    carregar();

    socket.emit("joinRoom", { salaId: id });

    socket.on("receiveMessage", (msg: any) => {
      setMensagens(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", { salaId: id });
    };
  }, [id]);

  useEffect(() => {
    if (!id || !userId) return;

    const buscarContrato = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/contracts/${id}`);
        const c: Contrato = res.data;
        const alunoId = extractId(c.aluno);
        const treinadorId = extractId(c.treinador);

        const outro = sameId(alunoId, userId) ? c.treinador : c.aluno;

        setNomeOutroUsuario((outro as any)?.nome || (outro as any)?.name || "Usuário");
      } catch (err) {
        console.error("Erro ao buscar contrato para nome do outro:", err);
      }
    };

    buscarContrato();
  }, [id, userId]);

  const enviarMensagem = () => {
    if (!novaMensagem.trim() || !id || !userId || !role) return;

    const msg: Mensagem & { salaId: string } = {
      salaId: String(id),
      conteudo: novaMensagem,
      remetente: userId,
      remetenteModel: String(role).trim().toLowerCase() === "aluno" ? "Aluno" : "Treinador",
      horario: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("sendMessage", msg);
    setNovaMensagem("");
  };

  const deletarContrato = async (contratoId: string) => {
    try {
      await axios.delete(`http://localhost:4000/contracts/${contratoId}`);
      setContratos(prev => prev.filter(c => c._id !== contratoId));
      if (String(id) === String(contratoId)) {
        router.push("/chat");
      }
    } catch (err) {
      console.error("Erro ao deletar contrato", err);
    }
  };

  return (
    <div className={styles.container}>
      
      <aside className={styles.sidebar}>
        <header className={styles.sidebarHeader}>
          Seus Contatos
        </header>

        <div className={styles.contactList}>
          {contratos.map(c => {
            const alunoId = extractId(c.aluno);
            const treinadorId = extractId(c.treinador);

            const outro = sameId(alunoId, userId) ? c.treinador : c.aluno;
            const outroName = (outro as any)?.nome || (outro as any)?.name || "Usuário";
            const estadoLabel =
              c.status === "ativo" ? "Contrato ativo" :
              c.status === "pendente" ? "Proposta pendente" :
              c.status === "cancelado" ? "Contrato cancelado" : "Estado desconhecido";

            return (
              <div
                key={c._id}
                className={`${styles.contactItem} ${id === c._id ? styles.activeContact : ""}`}
              >
                <div
                  className={styles.contactInfo}
                  onClick={() => router.push(`/chat/${c._id}`)}
                >
                  <strong>{outroName}</strong>
                  <p style={{ fontSize: 12, color: "#6b7280" }}>{estadoLabel}</p>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deletarContrato(c._id)}
                    title="Deletar contrato"
                  >
                    ✖
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      
      <main className={styles.chatArea}>
        {id ? (
          <>
            <header className={styles.chatHeader}>
              {nomeOutroUsuario}
            </header>

            <div className={styles.messages}>
              {mensagens.map(m => {
                const remetenteId =
                  typeof m.remetente === "string"
                    ? m.remetente
                    : (m.remetente as any)?._id;

                const isMe = String(remetenteId) === String(userId);

                return (
                  <div
                    key={m._id}
                    className={isMe ? styles.msgRight : styles.msgLeft}
                  >
                    <div className={isMe ? styles.bubbleRight : styles.bubbleLeft}>
                      {m.conteudo}
                      <div className={styles.time}>{m.horario}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className={styles.footer}>
              <input
                value={novaMensagem}
                onChange={e => setNovaMensagem(e.target.value)}
                onKeyDown={e => e.key === "Enter" && enviarMensagem()}
                placeholder="Digite sua mensagem"
                className={styles.input}
              />
              <button onClick={enviarMensagem} className={styles.sendBtn}>
                Enviar
              </button>
            </footer>
          </>
        ) : (
          <div className={styles.noChat}>
            Selecione um contato para começar
          </div>
        )}
      </main>
    </div>
  );
}
