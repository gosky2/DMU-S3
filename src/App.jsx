import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { initialBooks } from './data/books.js'
import { loadBooks, saveBooks } from './data/storage.js'
import { StatsCards } from './components/StatsCards.jsx'
import { Toolbar } from './components/Toolbar.jsx'
import { BookTable, LoanListPanel } from './components/BookTable.jsx'

function normalizeBooks(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return initialBooks.map((b) => ({ ...b }))
  return raw.map((b) => ({
    id: String(b.id),
    title: b.title ?? '',
    author: b.author ?? '',
    category: b.category ?? '',
    isBorrowed: Boolean(b.isBorrowed),
    borrowedAt: b.borrowedAt ?? null,
  }))
}

function filterBooks(books, query, availability) {
  const q = query.trim().toLowerCase()
  return books.filter((book) => {
    if (availability === 'available' && book.isBorrowed) return false
    if (availability === 'borrowed' && !book.isBorrowed) return false
    if (!q) return true
    const hay = `${book.title} ${book.author} ${book.category}`.toLowerCase()
    return hay.includes(q)
  })
}

export default function App() {
  const [books, setBooks] = useState(() => normalizeBooks(loadBooks(initialBooks)))
  const [query, setQuery] = useState('')
  const [availability, setAvailability] = useState('all')

  useEffect(() => {
    saveBooks(books)
  }, [books])

  const stats = useMemo(() => {
    const total = books.length
    const borrowed = books.filter((b) => b.isBorrowed).length
    return { total, available: total - borrowed, borrowed }
  }, [books])

  const displayed = useMemo(
    () => filterBooks(books, query, availability),
    [books, query, availability],
  )

  const borrowedBooks = useMemo(
    () => books.filter((b) => b.isBorrowed),
    [books],
  )

  const handleBorrow = useCallback((id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && !b.isBorrowed
          ? { ...b, isBorrowed: true, borrowedAt: new Date().toISOString() }
          : b,
      ),
    )
  }, [])

  const handleReturn = useCallback((id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && b.isBorrowed ? { ...b, isBorrowed: false, borrowedAt: null } : b,
      ),
    )
  }, [])

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <h1>도서관 대출 관리</h1>
          <p>정적 웹 · localStorage</p>
        </div>
        <StatsCards
          total={stats.total}
          available={stats.available}
          borrowed={stats.borrowed}
        />
      </aside>
      <main className="app-main">
        <LoanListPanel borrowedBooks={borrowedBooks} onReturn={handleReturn} />
        <div className="panel">
          <div className="panel-header">도서 목록</div>
          <div style={{ padding: '0 1rem 0.75rem' }}>
            <Toolbar
              query={query}
              onQueryChange={setQuery}
              availability={availability}
              onAvailabilityChange={setAvailability}
            />
          </div>
          <BookTable books={displayed} onBorrow={handleBorrow} onReturn={handleReturn} />
        </div>
      </main>
    </div>
  )
}
