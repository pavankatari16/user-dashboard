function SortArrow({ direction }) {
  return <span className="sortArrow">{direction === 'asc' ? '↑' : '↓'}</span>
}

export default function SortToggle({ label, direction, onToggle, isActive }) {
  return (
    <button
      type="button"
      className={`sortButton${isActive ? ' sortButtonActive' : ''}`}
      onClick={onToggle}
      aria-label={`${label} (currently ${direction === 'asc' ? 'ascending' : 'descending'})`}
      aria-pressed={isActive}
    >
      <span className="sortButtonLabel">{label}</span>
      <SortArrow direction={direction} />
    </button>
  )
}

