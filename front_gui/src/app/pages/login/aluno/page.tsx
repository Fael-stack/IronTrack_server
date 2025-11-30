'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function LoginAluno() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const parseJsonSafe = async (res: Response) => {
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) return res.json()
    const text = await res.text()
    try { return JSON.parse(text) } catch { return { __rawText: text } }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'Aluno' })
      })

      const data = await parseJsonSafe(res)
      if (!res.ok) {
        setError(data?.message || data?.error || data?.__rawText || 'Erro ao logar.')
        return
      }

      const token = data?.token ?? data?.accessToken ?? null
      if (!token) { setError('Resposta do servidor não contém token.'); return }

      const meRes = await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      const meJson = await parseJsonSafe(meRes)
      if (!meRes.ok) {
        setError(meJson?.message || meJson?.error || meJson?.__rawText || 'Falha ao obter dados do usuário.')
        return
      }

      const role = (meJson?.role ?? meJson?.user?.role ?? 'Aluno')
      const userObj = (meJson?.user ?? meJson?.aluno ?? meJson)
      const userId = userObj?._id ?? userObj?.id ?? null
      if (!userId) { setError('Não foi possível obter id do usuário.'); return }

      try {
        sessionStorage.setItem('userId', String(userId))
        sessionStorage.setItem('token', String(token))
        sessionStorage.setItem('userType', 'aluno')
        sessionStorage.setItem('role', String(role))
      } catch (err) {
        console.warn('Falha ao gravar sessionStorage:', err)
      }

      router.push('/pages/casa')
    } catch (err: any) {
      console.error('Erro no login aluno:', err)
      setError(err?.message || 'Erro no servidor.')
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Login - Aluno</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label>Senha</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btnPrimary">Entrar</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  )
}
