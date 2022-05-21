import Metadata from './Metadata'
import Tags from './Tags'

export default function BlogPreview({ post }) {
  const { slug, title, excerpt, date, readtime, tags } = post.frontmatter
  const formattedDate = new Date(date).toDateString()

  return (
    <div className="prose flex flex-col gap-1 dark:prose-invert">
      <h3 className=" m-0 font-bold text-zinc-400">{formattedDate}</h3>
      <a href={`/${slug}`} className="m-0 rounded no-underline">
        <h1 className="m-0 hover:text-amber-900 dark:hover:text-amber-300">
          {title}
        </h1>
      </a>
      <p className="m-0">{excerpt}</p>
      <Metadata className="m-0" readtime={readtime} />
      <Tags className="m-0" tags={tags} />
    </div>
  )
}
