import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import api, { apiError } from '../api'
import Field from '../components/Field'
import type { Item } from '../types'

export default function DetailPage() {
  const { id } = useParams()
  const [item, setItem] = useState<Item | null>(null)
  const [topic, setTopic] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function load() {
    try {
      const { data } = await api.get(`/tutors.ok/${id}`)
      setItem(data)
    } catch (err) {
      setMessage(apiError(err).message)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage('')
    const newErrors: Record<string, string> = {}
    const text = topic.trim()
    if (text.length < 5 || text.length > 100) newErrors.topic = 'Debe tener entre 5 y 100 caracteres'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSending(true)
    try {
      const { data } = await api.post(`/mentors/${id}/requests`, { topic: text })
        setMessage(data.message)
    } catch (err) {
      setMessage(apiError(err).message)
    }
    setSending(false)
  }
  
      