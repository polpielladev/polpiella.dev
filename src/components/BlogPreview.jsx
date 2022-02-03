
import Metadata from './Metadata'
import Tags from './Tags'

export default function BlogPreview({ post }){
    const { slug, title, excerpt, date, readtime, tags } = post
    const formattedDate = new Date(date).toDateString()

    return (
    <div className="prose dark:prose-invert">
        <h3 className=" text-zinc-400 mb-0 font-bold">{formattedDate}</h3>
        <a href={`/${slug}`} className="no-underline rounded"> 
            <h1 className="hover:text-amber-900 dark:hover:text-amber-300 mt-0 mb-2">{title}</h1>
        </a>
        <p className="mt-0 mb-2">{excerpt}</p>
        <Metadata readtime={readtime} />
        <Tags tags={tags} />
    </div>
)}


