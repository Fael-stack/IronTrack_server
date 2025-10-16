'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

export default function CriarContaTreinador() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    certification: '',
    card_number: '', // pagamento
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const res = await fetch('http://localhost:4000/treinadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          birthDate: form.birthDate,
          certification: form.certification,
          payment_info: { card_number: form.card_number },
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta.')
        return
      }

      localStorage.setItem("userId", data.treinador.id)
      localStorage.setItem("token", data.token)

      setSuccess('Conta criada com sucesso! Redirecionando...')
      setTimeout(() => router.push('/pages/casa'), 1500)
    } catch (err) {
      console.error(err)
      setError('Erro no servidor.')
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Criar Conta - Treinador</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup"><label>Nome</label><input name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Senha</label><input type="password" name="password" value={form.password} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Data de Nascimento</label><input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required /></div>
          <div className="formGroup"><label>CREF</label><input name="certification" value={form.certification} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Cartão (teste)</label><input name="card_number" value={form.card_number} onChange={handleChange} /></div>
          <button type="submit" className="btnPrimary">Criar Conta</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
        {success && <p className="successMessage">{success}</p>}
      </div>
    </div>
  )
}
