export default function Metadata({ filePath }) {
  return (
    <div className="flex flex-wrap gap-3 align-middle text-sm">
        <a
          id="gh-link"
          className="relative flex content-center items-center gap-1 no-underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/pol-piella/polpiella.dev/edit/main/${filePath}`}>
          <img className="m-0 w-5 aspect-square dark:invert" src="/assets/github.svg" />
          <b>Found a mistake? Edit on Github!</b>
        </a>
    </div>
  )
}
