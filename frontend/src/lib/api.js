const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.status === 204 ? null : response.json()
}
