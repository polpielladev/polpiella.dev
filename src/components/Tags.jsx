export default function Tags({ tags }) {
  return (
    <div className="mb-0 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          href={`/category/${tag.slug}`}
          key={tag.slug}
          className="rounded bg-amber-300 p-1 text-xs font-bold text-gray-900 no-underline"
        >
          {tag.name}
        </a>
      ))}
    </div>
  )
}
