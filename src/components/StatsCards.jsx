export function StatsCards({ total, available, borrowed }) {
  return (
    <div className="stats-grid">
      <div className="stat-card accent-violet">
        <div className="label">전체 도서</div>
        <div className="value">{total}</div>
      </div>
      <div className="stat-card accent-teal">
        <div className="label">대출 가능</div>
        <div className="value">{available}</div>
      </div>
      <div className="stat-card accent-amber">
        <div className="label">대출 중</div>
        <div className="value">{borrowed}</div>
      </div>
    </div>
  )
}
