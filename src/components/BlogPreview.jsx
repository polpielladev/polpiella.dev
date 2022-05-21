
import Metadata from './Metadata'
import Tags from './Tags'

export default function BlogPreview({ post }){
    const { slug, title, excerpt, date, readtime, tags } = post.frontmatter
    const formattedDate = new Date(date).toDateString()

    return (
    <div className="prose dark:prose-invert flex flex-col gap-1">
        <h3 className=" text-zinc-400 m-0 font-bold">{formattedDate}</h3>
        <a href={`/${slug}`} className="no-underline m-0 rounded"> 
            <h1 className="hover:text-amber-900 m-0 dark:hover:text-amber-300">{title}</h1>
        </a>
        <p className="m-0">{excerpt}</p>
        <Metadata className="m-0" readtime={readtime} />
        <Tags className="m-0" tags={tags} />
    </div>
)}


