import type { ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  if (!localStorage.getItem('token')) return <Navigate to="/login" />

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">Mentorias Utec</span>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium text-slate-200 hover:text-white">Tutorías</Link>
            <Link to="/my-requests" className="text-sm font-medium text-slate-200 hover:text-white">Mis solicitudes</Link>
            <button onClick={logout} className="bg-rose-500 hover:bg-rose-600">Cerrar sesión</button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  )
}
