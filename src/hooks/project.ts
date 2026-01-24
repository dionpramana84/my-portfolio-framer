'use client'

import { useEffect, useState } from 'react'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

export type Project = {
  id: string
  title: string
  description?: string
  slug?: string
}

type PayloadResponse<T> = {
  docs: T[]
  totalDocs: number
  page: number
  totalPages: number
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!CMS_URL) {
      setError('CMS URL not defined')
      setLoading(false)
      return
    }

    async function fetchProjects() {
      try {
        const res = await fetch(`${CMS_URL}/api/projects`)

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`)
        }

        const data: PayloadResponse<Project> = await res.json()
        setProjects(data.docs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
