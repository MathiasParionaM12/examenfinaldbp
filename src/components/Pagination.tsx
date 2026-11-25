interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>← Anterior</button>
      <span className="text-sm text-slate-600">Página <b>{page}</b> de <b>{totalPages}</b></span>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Siguiente →</button>
    </nav>
  )
}
