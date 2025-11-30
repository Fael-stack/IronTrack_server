//front_gui\src\app\pages\contratos\aluno\page.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome: string };
type Treinador = {
  _id: string;
  nome: string; 
  graduation?: string;
  description?: string;
  avaliacaoMedia?: number;
  weeklyRent?: number;
};
type Offer = {
  _id: string;
  titulo?: string;
  descricao: string;
  diasDisponiveis: string[];
  precoSemanal: number;
  ativo: boolean;
  treinador?: string | Treinador | null;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function sanitizeId(raw: string | null) {
  if (!raw) return "";
  const t = raw.trim();
  if (!t || t === "null" || t === "undefined") return "";
  return t;
}

function isLoggedInCandidate(aluno: Aluno | undefined) {
  if (aluno) return true;
  if (typeof window === "undefined") return false;
  const stored = sanitizeId(sessionStorage.getItem("userId"));
  const token = sanitizeId(sessionStorage.getItem("token"));
  return !!(stored || token);
}

function getAxiosConfig(token?: string) {
  if (!token) return undefined;
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default function AlunoContratosPage() {
  const [aluno, setAluno] = useState<Aluno | undefined>(undefined);
  const [treinadores, setTreinadores] = useState<Treinador[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [treinadorSelecionado, setTreinadorSelecionado] = useState<Treinador | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [noUser, setNoUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const rawLocal = typeof window !== "undefined" ? (sessionStorage.getItem("userId") ?? "") : "";
      const token: string | null = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

      let resolvedId: string | undefined = undefined;

      if (rawLocal && rawLocal !== "null" && rawLocal !== "undefined") {
        resolvedId = rawLocal;
      }

      if (!resolvedId && token) {
        try {
          const meRes = await axios.get(`${API}/alunos/me`, getAxiosConfig(token ?? undefined));
          const meData = meRes?.data;
          const maybeId = meData?._id ?? meData?.user?._id;
          if (maybeId) {
            resolvedId = String(maybeId);
            try { sessionStorage.setItem("userId", resolvedId); } catch {}
            const maybeAluno = meData?.user ?? meData;
            setAluno(maybeAluno);
          }
        } catch (err) {
          console.warn("Falha ao consultar /alunos/me:", err);
        }
      }

      if (resolvedId) {
        try {
          const alunoRes = await axios.get(`${API}/alunos/${encodeURIComponent(resolvedId)}`);
          if (alunoRes?.data?._id) {
            setAluno(alunoRes.data);
            try { sessionStorage.setItem("userId", resolvedId); } catch {}
          }
        } catch (err) {
          console.warn("Falha ao buscar aluno por id:", err);
        }
      }

      if (!resolvedId && !token) {
        setNoUser(true);
      } else {
        setNoUser(false);
      }

      try {
        const [treinadoresRes, offersRes] = await Promise.all([
          axios.get(`${API}/treinadores`).catch(e => ({ error: e })),
          axios.get(`${API}/offers`).catch(e => ({ error: e })),
        ]);

        let allTreinadores: Treinador[] = [];
        if (!(treinadoresRes as any).error) {
          allTreinadores = (treinadoresRes as any).data.map((t: any) => ({
            _id: t._id,
            nome: t.nome,
            graduation: t.graduation || "",
            description: t.description || t.descripiton || "",
            avaliacaoMedia: t.avaliacaoMedia ?? 0,
            weeklyRent: t.weeklyRent ?? 0,
          }));
        } else {
          console.error("Erro ao buscar treinadores:", (treinadoresRes as any).error);
        }

        let allOffers: Offer[] = [];
        if (!(offersRes as any).error) {
          allOffers = (offersRes as any).data.map((o: any) => ({
            ...o,
            descricao: o.descricao || o.description || "",
            treinador: o.treinador || null,
          }));
        } else {
          console.error("Erro ao buscar offers:", (offersRes as any).error);
        }

        const treinadorIdsComOffers = new Set(
          allOffers
            .filter(o => o.ativo !== false)
            .map(o => {
              if (!o.treinador) return null;
              return typeof o.treinador === "string" ? o.treinador : (o.treinador._id ?? null);
            })
            .filter(Boolean)
        );

        const filteredTreinadores = allTreinadores.filter(t => treinadorIdsComOffers.has(t._id));

        setTreinadores(filteredTreinadores);
        setOffers(allOffers);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const offersDoTreinador = treinadorSelecionado
    ? offers.filter(o => {
        const t = o.treinador;
        const tId = t ? (typeof t === "string" ? t : (t as Treinador)._id) : null;
        return tId === treinadorSelecionado._id && o.ativo !== false;
      })
    : [];

  const canOpenModal = () => isLoggedInCandidate(aluno);

  const requestOffer = async (offer: Offer) => {
    if (!isLoggedInCandidate(aluno)) {
      alert("Usuário não identificado. Faça login para solicitar uma vaga.");
      return;
    }

    let alunoId: string | null = aluno?._id ?? null;
    if (!alunoId && typeof window !== "undefined") {
      const raw = sanitizeId(sessionStorage.getItem("userId"));
      if (raw) alunoId = raw;
    }

    if (!alunoId) {
      alert("Não foi possível identificar o aluno. Faça login novamente.");
      return;
    }

    let treinadorId: string | null = null;
    if (offer.treinador) {
      treinadorId = typeof offer.treinador === "string" ? offer.treinador : (offer.treinador as Treinador)._id;
    } else if (treinadorSelecionado) {
      treinadorId = treinadorSelecionado._id;
    }

    if (!treinadorId) {
      alert("Não foi possível identificar o treinador da oferta.");
      return;
    }

    const payload: any = {
      aluno: alunoId,
      treinador: treinadorId,
      descricao: `Solicitação da oferta: ${offer.titulo ?? offer.descricao}`,
      status: "pendente",
      preco: offer.precoSemanal ?? (treinadorSelecionado?.weeklyRent ?? 0),
      offer: offer._id,
    };

    try {
      const token = sanitizeId(sessionStorage.getItem("token"));
      const res = await axios.post(`${API}/contracts`, payload, getAxiosConfig(token));
      const novoContrato = res.data;

      try {
        const resOffers = await axios.get(`${API}/offers?treinador=${encodeURIComponent(String(treinadorId))}`, getAxiosConfig(token));
        const newOffersForTrainer: Offer[] = resOffers.data || [];
        setOffers(prev => {
          const filtered = prev.filter(p => {
            const pTid = p.treinador ? (typeof p.treinador === "string" ? p.treinador : (p.treinador as Treinador)._id) : null;
            return pTid !== treinadorId;
          });
          const cleaned = newOffersForTrainer.map((o: any) => ({ ...o, descricao: o.descricao || o.description || "" }));
          return [...filtered, ...cleaned];
        });

        const remainingActive = newOffersForTrainer.filter(o => o.ativo !== false).length;
        if (remainingActive === 0) {
          setTreinadores(prev => prev.filter(t => t._id !== treinadorId));
        }
      } catch (err) {
        console.warn("Não foi possível atualizar ofertas após solicitar vaga:", err);
      }

      alert("Solicitação enviada com sucesso! O treinador receberá sua proposta.");
      if (novoContrato.status === "ativo" && novoContrato._id) {
        sessionStorage.setItem("userId", alunoId);
        sessionStorage.setItem("role", "Aluno");
        router.push(`/chat/${novoContrato._id}`);
      }
    } catch (err: any) {
      console.error("Erro ao criar contrato pendente:", err);
      const msg = err?.response?.data?.error || err.message || "Erro ao solicitar vaga";
      alert(`Falha ao solicitar vaga: ${msg}`);
    }
  };

  const openModalForOffer = (offer: Offer) => {
    if (!canOpenModal()) {
      alert("Usuário não identificado. Faça login para solicitar uma vaga.");
      return;
    }
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const openModalPersonalizado = (t: Treinador) => {
    if (!canOpenModal()) {
      alert("Usuário não identificado. Faça login para solicitar uma vaga.");
      return;
    }
    setSelectedOffer(undefined);
    setIsModalOpen(true);
  };

  const onContractCreated = async (novoContrato: any) => {
    setIsModalOpen(false);
    setSelectedOffer(undefined);

    const treinadorField = novoContrato.treinador;
    let treinadorIdForApi: string | null = null;
    if (!treinadorField) treinadorIdForApi = null;
    else if (typeof treinadorField === "string") treinadorIdForApi = treinadorField;
    else if (typeof treinadorField === "object" && treinadorField._id) treinadorIdForApi = treinadorField._id;

    try {
      if (treinadorIdForApi) {
        const token = sanitizeId(sessionStorage.getItem("token"));
        const resOffers = await axios.get(`${API}/offers?treinador=${encodeURIComponent(String(treinadorIdForApi))}`, getAxiosConfig(token));
        const newOffersForTrainer: Offer[] = resOffers.data || [];

        setOffers(prev => {
          const filtered = prev.filter(p => {
            const pTid = p.treinador ? (typeof p.treinador === "string" ? p.treinador : (p.treinador as Treinador)._id) : null;
            return pTid !== treinadorIdForApi;
          });
          const cleaned = newOffersForTrainer.map((o: any) => ({ ...o, descricao: o.descricao || o.description || "" }));
          return [...filtered, ...cleaned];
        });

        const remainingActive = newOffersForTrainer.filter(o => o.ativo !== false).length;
        if (remainingActive === 0) setTreinadores(prev => prev.filter(t => t._id !== treinadorIdForApi));
      }
    } catch (err) {
      console.warn("Erro ao atualizar ofertas após criar contrato:", err);
    }

    if (novoContrato.status === "ativo" && novoContrato._id) {
      if (!aluno && typeof window !== "undefined") {
        if (novoContrato.aluno && novoContrato.aluno._id) {
          try { sessionStorage.setItem("userId", novoContrato.aluno._id); } catch {}
        }
      }
      sessionStorage.setItem("role", "Aluno");
      router.push(`/chat/${novoContrato._id}`);
    }
  };

  if (loading) return <div className={styles.page}><div className={styles.emptyState}>Carregando...</div></div>;

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Treinadores com ofertas</h2>
        <div className={styles.workoutList}>
          {treinadores.length === 0 && <div className={styles.emptyState}>Nenhum treinador com ofertas no momento.</div>}
          {treinadores.map(t => (
            <div
              key={t._id}
              className={`${styles.workoutItem} ${treinadorSelecionado?._id === t._id ? styles.active : ""}`}
              onClick={() => setTreinadorSelecionado(t)}
              style={{ cursor: "pointer" }}
            >
              <div>
                <div className={styles.trainerName}>{t.nome}</div>
                <div className={styles.trainerMeta}>{t.graduation || "Formação não informada"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        {!isLoggedInCandidate(aluno) && (
          <div className={styles.emptyState}>
            Usuário não identificado. Faça login para solicitar vagas.
            <div style={{ marginTop: 12 }}>
              <button onClick={() => router.push("/login")}>Ir para login</button>
            </div>
          </div>
        )}

        {isLoggedInCandidate(aluno) && !treinadorSelecionado && (
          <div className={styles.emptyState}>Selecione um treinador à esquerda para ver as ofertas e contratar.</div>
        )}

        {isLoggedInCandidate(aluno) && treinadorSelecionado && (
          <div className={styles.contractLists}>
            <div className={styles.trainerPanel}>
              <div className={styles.trainerTop}>
                <div className={styles.trainerPhoto}>
                  {treinadorSelecionado.nome.split(" ").slice(0,2).map(n => n[0]).join("")}
                </div>
                <div className={styles.trainerInfo}>
                  <div className={styles.trainerNameBig}>{treinadorSelecionado.nome}</div>
                  <div className={styles.trainerGrad}>{treinadorSelecionado.graduation}</div>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={styles.star} style={{ opacity: i < Math.round(treinadorSelecionado.avaliacaoMedia || 0) ? 1 : 0.25 }} />
                    ))}
                    <span style={{ marginLeft: 8, fontSize: 13, color: "#6b7280" }}>
                      {treinadorSelecionado.avaliacaoMedia?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                  <div className={styles.rentBadge}>
                    R$ { (treinadorSelecionado.weeklyRent ?? 0).toFixed(2) } / semana
                  </div>
                </div>
              </div>

              <div className={styles.trainerDesc}>
                {treinadorSelecionado.description || "Sem descrição informada."}
              </div>

              <div className={styles.actionRow}>
                <button className={styles.btnPrimary} onClick={() => openModalPersonalizado(treinadorSelecionado)}>Contratar personalizado</button>
                <button className={styles.btnSecondary} onClick={() => setTreinadorSelecionado(null)}>Voltar</button>
              </div>
            </div>

            <div className={styles.contractColumn}>
              <h2>Ofertas de {treinadorSelecionado.nome}</h2>
              <div className={styles.contractList}>
                {offersDoTreinador.length === 0 && <div className={styles.emptyState}>Nenhuma oferta ativa encontrada.</div>}
                {offersDoTreinador.map(o => (
                  <div key={o._id} className={styles.contractItem}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{o.titulo}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{o.descricao}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>
                        Dias: {o.diasDisponiveis.join(", ")} • R$ {o.precoSemanal?.toFixed?.(2)}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className={styles.addBtn} onClick={() => requestOffer(o)}>Solicitar vaga</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
