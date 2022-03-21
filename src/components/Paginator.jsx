const Link = ({ url, children }) => (
  <a className="bg-gray-300 dark:bg-gray-700 font-bold p-2 rounded hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors" href={url}>{children}</a>
)

export default function Metadata ({ previousURL, nextURL }) {
  return (
    <div className="flex gap-3 justify-start dark:text-gray-100">
      {previousURL && <Link url={previousURL}>&larr; Newer Articles</Link>}
      {nextURL && <Link url={nextURL}>Older Articles &rarr;</Link>}
    </div>
  )
}