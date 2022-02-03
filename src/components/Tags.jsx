export default function Tags({ tags }) {
    return (
    <div className="flex flex-wrap gap-2 mb-0">
        {tags.map(tag => <a href={`/category/${tag.slug}`} className="bg-amber-300 p-1 rounded text-xs font-bold text-gray-900 no-underline">{tag.name}</a>)}
    </div>)
}