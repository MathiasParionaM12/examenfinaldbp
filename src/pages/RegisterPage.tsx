import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { apiError } from '../api'
import Field from '../components/Field'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!name.trim() || name.length > 100) newErrors.name = 'Nombre obligatorio, máximo 100 caracteres'
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Correo no válido'
    if (!/^[ -~]{8,72}$/.test(password)) newErrors.password = 'De 8 a 72 caracteres'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (err) {
      setMessage(apiError(err).message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Crear cuenta</h1>
          <p className="text-sm text-slate-500">Completa tus datos para registrarte</p>
        </div>
        <Field label="Nombre" error={errors.name}>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Correo" error={errors.email}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Contraseña" error={errors.password}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        {message && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{message}</p>}
        <button>Registrarme</button>
        <Link to="/login" className="text-center text-sm font-medium text-emerald-700 hover:underline">¿Ya tienes cuenta? Inicia sesión</Link>
      </form>
    </div>
  )
}
