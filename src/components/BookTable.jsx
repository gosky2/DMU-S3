function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('ko-KR', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return ''
  }
}

export function BookTable({ books, onBorrow, onReturn }) {
  if (books.length === 0) {
    return <p className="empty-hint">조건에 맞는 도서가 없습니다.</p>
  }

  return (
    <div className="table-wrap">
      <table className="book-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>저자</th>
            <th>카테고리</th>
            <th>상태</th>
            <th style={{ width: '110px' }}>동작</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>
                {book.isBorrowed ? (
                  <span className="badge borrowed">대출 중</span>
                ) : (
                  <span className="badge available">대출 가능</span>
                )}
              </td>
              <td>
                {book.isBorrowed ? (
                  <button
                    type="button"
                    className="btn-sm btn-return"
                    onClick={() => onReturn(book.id)}
                  >
                    반납하기
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-sm btn-borrow"
                    onClick={() => onBorrow(book.id)}
                  >
                    대출하기
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LoanListPanel({ borrowedBooks, onReturn }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span>현재 대출 목록</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#94a3b8' }}>
          {borrowedBooks.length}권
        </span>
      </div>
      {borrowedBooks.length === 0 ? (
        <p className="empty-hint">대출 중인 도서가 없습니다.</p>
      ) : (
        <ul className="loan-list">
          {borrowedBooks.map((book) => (
            <li key={book.id} className="loan-item">
              <div>
                <strong>{book.title}</strong>
                <div className="loan-meta">
                  {book.author} · 대출일 {formatDate(book.borrowedAt)}
                </div>
              </div>
              <button
                type="button"
                className="btn-sm btn-return"
                onClick={() => onReturn(book.id)}
              >
                반납하기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
