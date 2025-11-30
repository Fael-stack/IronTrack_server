// front_gui/src/app/pages/criar_conta/aluno/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './page.css'

export default function CriarContaAluno() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
    weight: '',
    height: '',
    phone: '',
    card_number: '',
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
      const res = await fetch('http://localhost:4000/alunos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          birthDate: form.birthDate,
          weight: Number(form.weight),
          height: Number(form.height),
          phone: form.phone,
          payment_info: { card_number: form.card_number },
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta.')
        return
      }

      sessionStorage.setItem("userId", data.aluno.id || data.aluno._id)
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("userType", 'aluno')

      setSuccess('Conta criada com sucesso! Redirecionando...')
      setTimeout(() => router.push('/pages/casa'), 1000)
    } catch (err) {
      console.error(err)
      setError('Erro no servidor.')
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Criar Conta - Aluno</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup"><label>Nome</label><input name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Senha</label><input type="password" name="password" value={form.password} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Data de Nascimento</label><input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Peso</label><input type="number" name="weight" value={form.weight} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Altura</label><input type="number" name="height" value={form.height} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Telefone</label><input name="phone" value={form.phone} onChange={handleChange} required /></div>
          <div className="formGroup"><label>Cartão (teste)</label><input name="card_number" value={form.card_number} onChange={handleChange} /></div>
          <button type="submit" className="btnPrimary">Criar Conta</button>
        </form>
        {error && <p className="errorMessage">{error}</p>}
        {success && <p className="successMessage">{success}</p>}
      </div>
    </div>
  )
}
