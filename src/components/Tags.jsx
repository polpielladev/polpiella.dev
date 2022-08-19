export default function Tags({ tags }) {
  return (
    <div className="mb-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span class="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
          {tag.name}
        </span>
      ))}
    </div>
  )
}
