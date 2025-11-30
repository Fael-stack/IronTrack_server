//front_gui\src\app\pages\contratos\treinador\page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome?: string; name?: string };
type Treinador = { _id: string; nome: string };

type Contract = {
  _id: string;
  aluno: Aluno | null;
  treinador: Treinador | null;
  status: string;
  descricao?: string;
  preco?: number;
};

type Offer = {
  _id: string;
  titulo?: string;
  descricao: string;
  diasDisponiveis: string[];
  precoSemanal: number;
  ativo: boolean;
  treinador?: Treinador | string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function sanitizeId(raw: string | null) {
  if (!raw) return "";
  const t = raw.trim();
  if (!t || t === "null" || t === "undefined") return "";
  return t;
}

function getAxiosConfig(token?: string | undefined) {
  if (!token) return undefined;
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default function TreinadorContratosPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [treinadorId, setTreinadorId] = useState<string>("");
  const [form, setForm] = useState({
    titulo: "Mentoria",
    descricao: "",
    diasDisponiveis: [] as string[],
    precoSemanal: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sanitizeId(sessionStorage.getItem("userId"));
    if (raw) setTreinadorId(raw);
  }, []);

  const fetchForTreinador = async (resolvedTrainerId: string, token?: string | null) => {
    try {
      setContracts([]);
      setOffers([]);

      const config = getAxiosConfig(token ?? undefined);

      const [resC, resO] = await Promise.all([
        axios.get<Contract[]>(`${API}/contracts`, config),
        axios.get<Offer[]>(`${API}/offers?treinador=${encodeURIComponent(resolvedTrainerId)}`, config),
      ]);

      const meus = (resC?.data || []).filter(c => c.treinador?._id === resolvedTrainerId);
      setContracts(meus);
      setOffers((resO?.data || []).map((o: any) => ({ ...o, descricao: o.descricao || o.description || "" })));
    } catch (err: any) {
      console.error("Erro ao buscar contratos/offers:", err);
      setContracts([]);
      setOffers([]);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const raw = sanitizeId(sessionStorage.getItem("userId"));
      const token = sanitizeId(sessionStorage.getItem("token")) || null;

      if (raw) {
        if (!mounted) return;
        setTreinadorId(raw);
        await fetchForTreinador(raw, token);
        return;
      }

      if (token) {
        try {
          const meRes = await axios.get(`${API}/treinadores/me`, getAxiosConfig(token ?? undefined));
          const id = meRes?.data?._id;
          if (id) {
            if (!mounted) return;
            setTreinadorId(id);
            try { sessionStorage.setItem("userId", id); } catch {}
            await fetchForTreinador(id, token);
            return;
          }
        } catch (err) {
          console.warn("Não foi possível obter treinador via /treinadores/me:", err);
        }
      }

      if (!mounted) return;
      setContracts([]);
      setOffers([]);
    };

    fetchData();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!treinadorId) return;
    const token = sanitizeId(sessionStorage.getItem("token")) || null;
    fetchForTreinador(treinadorId, token);
  }, [treinadorId]);

  const pendentes = contracts.filter(c => c.status === "pendente");
  const ativos = contracts.filter(c => c.status === "ativo");

  const confirmarContrato = async (id: string) => {
    try {
      const token = sanitizeId(sessionStorage.getItem("token"));
      const res = await axios.put(`${API}/contracts/${id}`, { status: "ativo" }, getAxiosConfig(token ?? undefined));
      setContracts(prev => prev.map(p => (p._id === id ? res.data : p)));
    } catch (err) { console.error(err); alert("Falha ao confirmar contrato."); }
  };

  const cancelarContrato = async (id: string) => {
    try {
      const token = sanitizeId(sessionStorage.getItem("token"));
      const role = sanitizeId(sessionStorage.getItem("role"));

      if (role === "Treinador" || role === "treinador") {
        await axios.delete(`${API}/contracts/${id}`, getAxiosConfig(token ?? undefined));
        setContracts(prev => prev.filter(p => p._id !== id));
      } else {
        await axios.put(`${API}/contracts/${id}`, { status: "cancelado" }, getAxiosConfig(token ?? undefined));
        setContracts(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao cancelar contrato.");
    }
  };

  const abrirChat = (contractId: string) => {
    sessionStorage.setItem("role", "Treinador");
    router.push(`/chat/${contractId}`);
  };

  const toggleDia = (dia: string) => {
    setForm(f => {
      const exists = f.diasDisponiveis.includes(dia);
      return { ...f, diasDisponiveis: exists ? f.diasDisponiveis.filter(d => d !== dia) : [...f.diasDisponiveis, dia] };
    });
  };

  const criarOferta = async () => {
    try {
      if (!form.descricao || form.descricao.trim().length === 0) {
        alert("Preencha a descrição da oferta.");
        return;
      }
      if (!Array.isArray(form.diasDisponiveis) || form.diasDisponiveis.length === 0) {
        alert("Selecione ao menos um dia disponível.");
        return;
      }
      if (form.precoSemanal == null || isNaN(form.precoSemanal) || Number(form.precoSemanal) < 0) {
        alert("Informe um preço semanal válido (>= 0).");
        return;
      }

      const token = sanitizeId(sessionStorage.getItem("token"));
      const config = getAxiosConfig(token ?? undefined);

      const res = await axios.post(`${API}/offers`, {
        titulo: form.titulo,
        descricao: form.descricao,
        diasDisponiveis: form.diasDisponiveis,
        precoSemanal: Number(form.precoSemanal),
        ativo: true
      }, config);

      if (res?.status === 201 && res?.data && res.data._id) {
        setOffers(prev => [res.data, ...prev]);
        setForm({ titulo: "Mentoria", descricao: "", diasDisponiveis: [], precoSemanal: 0 });
      } else {
        console.warn("Resposta inesperada ao criar offer:", res);
        alert("Oferta criada, mas resposta inesperada do servidor. Verifique o servidor.");
      }
    } catch (err: any) {
      console.error("Erro criar oferta", err);
      if (err?.response) {
        const serverMsg = err.response.data?.error || err.response.data?.message || JSON.stringify(err.response.data);
        alert(`Erro ao criar oferta: ${serverMsg}`);
      } else {
        alert("Erro ao criar oferta. Veja console para detalhes.");
      }
    }
  };

  const deletarOferta = async (id: string) => {
    try {
      const token = sanitizeId(sessionStorage.getItem("token"));
      await axios.delete(`${API}/offers/${id}`, getAxiosConfig(token ?? undefined));
      setOffers(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      console.error(err);
      alert("Falha ao deletar oferta.");
    }
  };

  const editarOferta = async (id: string, data: Partial<Offer>) => {
    try {
      const token = sanitizeId(sessionStorage.getItem("token"));
      const res = await axios.put(`${API}/offers/${id}`, data, getAxiosConfig(token ?? undefined));
      setOffers(prev => prev.map(o => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error(err);
      alert("Falha ao editar oferta.");
    }
  };

  const dias = ["segunda","terca","quarta","quinta","sexta","sabado","domingo"];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Seus Contratos</h2>
        <div className={styles.contractLists}>

          <div className={styles.contractColumn}>
            <h2>Pendentes</h2>
            <div className={styles.contractList}>
              {pendentes.length === 0 && <div className={styles.emptyState}>Nenhum contrato pendente.</div>}
              {pendentes.map(c => (
                <div key={c._id} className={styles.contractItem}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{c.aluno?.nome || c.aluno?.name || "Aluno não identificado"}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{c.descricao}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>R$ { (c.preco ?? 0).toFixed(2) }</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className={styles.addBtn} onClick={() => confirmarContrato(c._id)}>Confirmar</button>
                    <button className={styles.removeBtn} onClick={() => cancelarContrato(c._id)}>Recusar</button>
                    <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.contractColumn}>
            <h2>Ofertas</h2>

            <div style={{ marginBottom: 12, padding: 12, borderRadius: 8, background: "#fafafa" }}>
              <div><strong>Criar nova oferta</strong></div>
              <input
                placeholder="Título (ex: Mentoria de Força)"
                value={form.titulo}
                onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                style={{ width: "100%", marginTop: 8 }}
              />
              <textarea
                placeholder="Descreva no que pode ajudar"
                value={form.descricao}
                onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
                style={{ width: "100%", marginTop: 8 }}
              />
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 13, marginBottom: 6 }}>Dias disponíveis</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {dias.map(d => (
                    <button
                      key={d}
                      onClick={() => toggleDia(d)}
                      style={{
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: form.diasDisponiveis.includes(d) ? "2px solid #111" : "1px solid #ddd",
                        background: form.diasDisponiveis.includes(d) ? "#fff" : "transparent",
                        cursor: "pointer"
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                <input
                  type="number"
                  placeholder="Preço semanal (R$)"
                  value={form.precoSemanal}
                  onChange={e => setForm(f => ({ ...f, precoSemanal: Number(e.target.value) }))} />
              </div>

              <div style={{ marginTop: 8 }}>
                <button className={styles.addBtn} onClick={criarOferta}>Criar Oferta</button>
              </div>
            </div>

            <div className={styles.contractList}>
              {offers.length === 0 && <div className={styles.emptyState}>Nenhuma oferta criada.</div>}
              {offers.map(o => (
                <div key={o._id} className={styles.contractItem}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{o.titulo}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{o.descricao}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>
                      Dias: {o.diasDisponiveis.join(", ")} • R$ {o.precoSemanal?.toFixed?.(2)}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => editarOferta(o._id, { ativo: !o.ativo })}>{o.ativo ? "Desativar" : "Ativar"}</button>
                    <button className={styles.removeBtn} onClick={() => deletarOferta(o._id)}>Deletar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.contractColumn}>
            <h2>Ativos / Alunos</h2>
            <div className={styles.contractList}>
              {ativos.length === 0 && <div className={styles.emptyState}>Nenhum contrato ativo.</div>}
              {ativos.map(c => (
                <div key={c._id} className={styles.contractItem}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{c.aluno?.nome || c.aluno?.name || "Aluno não identificado"}</div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>{c.descricao}</div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
                    <button className={styles.removeBtn} onClick={() => cancelarContrato(c._id)}>Cancelar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
