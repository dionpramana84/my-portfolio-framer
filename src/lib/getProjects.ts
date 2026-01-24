import 'server-only'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

export async function getProjects() {
  if (!CMS_URL) {
    throw new Error('CMS URL not defined')
  }

  const res = await fetch(`${CMS_URL}/api/projects`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }

  const data = await res.json()
  return data.docs
}
