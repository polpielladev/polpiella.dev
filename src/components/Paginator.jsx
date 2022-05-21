const Link = ({ url, children }) => (
  <a
    className="rounded bg-gray-300 p-2 font-bold transition-colors hover:bg-slate-300 dark:bg-gray-700 dark:hover:bg-slate-800"
    href={url}>
    {children}
  </a>
)

export default function Metadata({ previousURL, nextURL }) {
  return (
    <div className="flex justify-start gap-3 dark:text-gray-100">
      {previousURL && <Link url={previousURL}>&larr; Newer Articles</Link>}
      {nextURL && <Link url={nextURL}>Older Articles &rarr;</Link>}
    </div>
  )
}
