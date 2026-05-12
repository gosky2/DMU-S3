export function Toolbar({ query, onQueryChange, availability, onAvailabilityChange }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="search-input"
        placeholder="제목, 저자, 카테고리 검색…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="도서 검색"
      />
      <div className="filter-group" role="group" aria-label="대출 상태 필터">
        <button
          type="button"
          className={`filter-btn ${availability === 'all' ? 'active' : ''}`}
          onClick={() => onAvailabilityChange('all')}
        >
          전체
        </button>
        <button
          type="button"
          className={`filter-btn ${availability === 'available' ? 'active' : ''}`}
          onClick={() => onAvailabilityChange('available')}
        >
          대출 가능
        </button>
        <button
          type="button"
          className={`filter-btn ${availability === 'borrowed' ? 'active' : ''}`}
          onClick={() => onAvailabilityChange('borrowed')}
        >
          대출 중
        </button>
      </div>
    </div>
  )
}
