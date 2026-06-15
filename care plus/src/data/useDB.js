import { useState, useEffect } from 'react'

// Simula consumo de API local usando o arquivo JSON
export function useDB() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Simula uma chamada de API com fetch no arquivo JSON local
    fetch('/src/data/db.json')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados')
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}