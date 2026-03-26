import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import SortToggle from '../components/SortToggle.jsx'
import UserTable from '../components/UserTable.jsx'

export default function Dashboard({ users, loading, error }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortColumn, setSortColumn] = useState('name') // last clicked sort column
  const [nameDirection, setNameDirection] = useState('asc')
  const [companyDirection, setCompanyDirection] = useState('asc')

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(handle)
  }, [searchQuery])

  const filteredUsers = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return users

    return users.filter((u) => {
      const name = (u.name ?? '').toLowerCase()
      const email = (u.email ?? '').toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [users, debouncedQuery])

  const sortedUsers = useMemo(() => {
    const arr = filteredUsers.slice() // do not mutate original data

    arr.sort((a, b) => {
      const nameA = a.name ?? ''
      const nameB = b.name ?? ''
      const nameCmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' })

      const companyA = a.company?.name ?? ''
      const companyB = b.company?.name ?? ''
      const companyCmp = companyA.localeCompare(companyB, undefined, { sensitivity: 'base' })

      if (sortColumn === 'name') {
        if (nameCmp !== 0) return nameDirection === 'asc' ? nameCmp : -nameCmp
        return companyDirection === 'asc' ? companyCmp : -companyCmp
      }

      if (companyCmp !== 0) return companyDirection === 'asc' ? companyCmp : -companyCmp
      return nameDirection === 'asc' ? nameCmp : -nameCmp
    })

    return arr
  }, [filteredUsers, sortColumn, nameDirection, companyDirection])

  return (
    <div className="page">
      <div className="toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="sortControls" aria-label="Sorting controls">
          <SortToggle
            label="Sort by Name"
            direction={nameDirection}
            isActive={sortColumn === 'name'}
            onToggle={() => {
              setSortColumn('name')
              setNameDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
            }}
          />
          <SortToggle
            label="Sort by Company"
            direction={companyDirection}
            isActive={sortColumn === 'company'}
            onToggle={() => {
              setSortColumn('company')
              setCompanyDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="status">Loading users...</div>
      ) : error ? (
        <div className="status statusError">
          <p className="statusMessage">Unable to load users.</p>
          <p className="statusDetails">{error.message}</p>
        </div>
      ) : sortedUsers.length === 0 ? (
        <div className="status">No users found</div>
      ) : (
        <UserTable users={sortedUsers} highlightQuery={debouncedQuery} />
      )}
    </div>
  )
}

