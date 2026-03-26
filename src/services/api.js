const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

/**
 * Fetches all users.
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function fetchUsers(options = {}) {
  const res = await fetch(USERS_URL, { signal: options.signal })
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

