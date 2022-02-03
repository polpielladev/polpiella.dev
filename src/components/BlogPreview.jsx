
import Metadata from './Metadata'
import Tags from './Tags'

export default function BlogPreview({ post }){
    const { slug, title, excerpt, date, readtime, tags } = post
    const formattedDate = new Date(date).toDateString()

    return (
    <div class="prose dark:prose-invert">
        <h3 class=" text-zinc-400 mb-0 font-bold">{formattedDate}</h3>
        <a href={`/${slug}`} class="no-underline rounded"> 
            <h1 class="hover:text-amber-900 dark:hover:text-amber-300 mt-0 mb-2">{title}</h1>
        </a>
        <p class="mt-0 mb-2">{excerpt}</p>
        <Metadata readtime={readtime} />
        <Tags tags={tags} />
    </div>
)}


