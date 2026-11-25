import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { apiError } from '../api'
import Field from '../components/Field'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!email || !password) return setMessage('Correo y contraseña son obligatorios')

        try {
            const { data } = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } catch (err) {
            setMessage(apiError(err).message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4 
            rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-lg">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Iniciar sesión</h1>
                    <p className="text-sm text-slate-500">Ingresa tus datos para continuar</p>
                </div>
                <Field label="Correo">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Field>
                <Field label="Contraseña">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Field>
                {message && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{message}</p>}
                <button>Iniciar sesión</button>
                <Link to="/register" className="text-center text-sm font-medium text-emerald-700 hover:underline">¿No tienes cuenta? Regístrate</Link>
            </form>
        </div>
    )
}   