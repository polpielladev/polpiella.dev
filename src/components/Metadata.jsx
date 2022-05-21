export default function Metadata({ readtime, slug }) {
  return (
    <div className="flex flex-wrap gap-3 align-middle text-xs">
      <p className="m-0 flex items-center">
        <b>Read Time: </b>
        {`📖 ${readtime} minutes`}
      </p>
      {slug && (
        <a
          id="gh-link"
          className="relative flex content-center items-center gap-1 no-underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/pol-piella/polpiella.dev/edit/main/src/pages/${slug}.md`}
        >
          <img className="m-0 w-5 dark:invert" src="/assets/github.svg" />
          <b>Found a mistake? Edit on Github!</b>
        </a>
      )}
    </div>
  )
}
