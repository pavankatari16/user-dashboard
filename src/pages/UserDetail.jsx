import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

function KeyValue({ label, value }) {
  return (
    <div className="kv">
      <div className="kvLabel">{label}</div>
      <div className="kvValue">{value}</div>
    </div>
  )
}

export default function UserDetail({ users, loading, error }) {
  const { id } = useParams()

  const user = useMemo(() => {
    if (!id) return null
    return users.find((u) => String(u.id) === String(id)) ?? null
  }, [users, id])

  if (loading) return <div className="status">Loading users...</div>

  if (error) {
    return (
      <div className="page">
        <div className="detailHeader">
          <Link className="backButton" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="status statusError">
          <p className="statusMessage">Unable to load user.</p>
          <p className="statusDetails">{error.message}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page">
        <div className="detailHeader">
          <Link className="backButton" to="/">
            Back to Dashboard
          </Link>
        </div>
        <div className="status">User not found</div>
      </div>
    )
  }

  const street = user.address?.street ?? ''
  const city = user.address?.city ?? ''
  const companyName = user.company?.name ?? ''

  return (
    <div className="page">
      <div className="detailHeader">
        <Link className="backButton" to="/">
          Back to Dashboard
        </Link>
      </div>

      <h2 className="detailTitle">{user.name}</h2>

      <div className="detailGrid">
        <div className="detailCard">
          <KeyValue label="Email" value={<a className="link" href={`mailto:${user.email}`}>{user.email}</a>} />
          <KeyValue label="Phone" value={user.phone} />
          <KeyValue
            label="Website"
            value={
              <a className="link" href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            }
          />
        </div>

        <div className="detailCard">
          <KeyValue label="Company" value={companyName} />
          <KeyValue label="Address" value={`${street}${street && city ? ', ' : ''}${city}`} />
        </div>
      </div>
    </div>
  )
}

