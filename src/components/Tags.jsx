export default function Tags({ tags }) {
  return (
    <div className="mb-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          className="not-prose no-underline"
          href={`/category/${tag.slug}`}
          key={tag.slug}>
          <div
            class="inline-flex items-center justify-between rounded-lg bg-gray-100 py-0.5 px-4 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            aria-label="Component requires Tailwind v3.0">
            <span class="text-sm font-medium">{tag.name}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
