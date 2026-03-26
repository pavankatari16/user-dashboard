import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import UserDetail from './pages/UserDetail.jsx'
import { fetchUsers } from './services/api.js'
import './App.css'

const UsersContext = createContext(null)

function UsersProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchUsers({ signal: controller.signal })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err : new Error('Failed to fetch users'))
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const value = useMemo(() => ({ users, loading, error }), [users, loading, error])
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

function useUsers() {
  const ctx = useContext(UsersContext)
  if (!ctx) throw new Error('useUsers must be used within UsersProvider')
  return ctx
}

function DashboardRoute() {
  const { users, loading, error } = useUsers()
  return <Dashboard users={users} loading={loading} error={error} />
}

function UserDetailRoute() {
  const { users, loading, error } = useUsers()
  return <UserDetail users={users} loading={loading} error={error} />
}

function App() {
  return (
    <UsersProvider>
      <div className="app">
        <header className="appHeader">
          <h1 className="appTitle">User Directory Dashboard</h1>
          <p className="appSubtitle">Search and sort users from the API.</p>
        </header>

        <main className="appMain">
          <Routes>
            <Route path="/" element={<DashboardRoute />} />
            <Route path="/user/:id" element={<UserDetailRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </UsersProvider>
  )
}

export default App
