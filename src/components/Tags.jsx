export default function Tags({ tags }) {
  return (
    <div className="mb-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          className="not-prose no-underline"
          href={`/category/${tag.slug}`}
          key={tag.slug}>
          <div
            className="inline-flex items-center justify-between rounded-lg bg-yellow-300 py-0.5 px-4 text-xs text-gray-700 transition-colors hover:bg-yellow-200"
            aria-label="Component requires Tailwind v3.0">
            <span className="text-sm font-medium">{tag.name}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
