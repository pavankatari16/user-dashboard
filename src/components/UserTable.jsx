import { useNavigate } from 'react-router-dom'

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function HighlightText({ text, query }) {
  const safeText = text ?? ''
  const q = (query ?? '').trim()
  if (!q) return safeText

  const re = new RegExp(`(${escapeRegExp(q)})`, 'ig')
  const parts = String(safeText).split(re)
  return parts.map((part, idx) => {
    const isMatch = part.toLowerCase() === q.toLowerCase()
    return isMatch ? <mark key={idx}>{part}</mark> : <span key={idx}>{part}</span>
  })
}

export default function UserTable({ users, highlightQuery }) {
  const navigate = useNavigate()

  return (
    <div className="tableWrap" role="region" aria-label="User directory">
      <table className="userTable">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const companyName = user.company?.name ?? ''
            return (
              <tr
                key={user.id}
                className="userRow"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/user/${user.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(`/user/${user.id}`)
                  }
                }}
                aria-label={`View details for ${user.name}`}
              >
                <td>
                  <HighlightText text={user.name} query={highlightQuery} />
                </td>
                <td>
                  <a href={`mailto:${user.email}`} className="link">
                    <HighlightText text={user.email} query={highlightQuery} />
                  </a>
                </td>
                <td>{user.phone}</td>
                <td>
                  <HighlightText text={companyName} query={highlightQuery} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

