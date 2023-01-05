import Fuse from 'fuse.js'
import { useState } from 'react'

export default function SearchBar({ searchables }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const fuse = new Fuse(searchables, {
    keys: ['title', 'excerpt', 'headings'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  })

  function handleChange(e) {
    setSearchTerm(e.currentTarget.value)
    setSearchResults(
      e.currentTarget.value.length > 1
        ? fuse.search(searchTerm).slice(0, 5)
        : []
    )
  }

  return (
    <div className="relative ml-4 hidden flex-grow sm:block">
      <input
        aria-label="Search articles"
        type="text"
        placeholder="Search articles"
        className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        onChange={handleChange}
        autoComplete="off"
      />
      <div className="absolute z-30">
        {searchResults.map(({ item }) => (
          <a href={`/${item.slug}`}>
            <div className="flex cursor-pointer flex-col gap-1 bg-gray-100 p-4 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
              <header
                key={item.slug}
                className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </header>
              <p className="text-sm leading-snug text-gray-700 dark:text-gray-300">
                {item.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
