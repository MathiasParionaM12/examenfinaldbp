import type { ReactNode } from 'react'

interface FieldProps {
    label: string
    error?: string
    children: ReactNode
}

export default function Field({ label, error, children }: FieldProps) {
    return (
        <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-semibold text-slate-800">{label}
            </span>
            {children}
            {error && <span className="text-xs font-medium text-rose-600">{error}</span>}
        </label>
    )
}