export default function Metadata({ filePath }) {
  return (
    <div className="not-prose flex flex-wrap align-middle text-sm">
      <a
        id="gh-link"
        className="relative flex content-center items-center gap-1 no-underline"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/pol-piella/polpiella.dev/edit/main/${filePath}`}>
        <img
          className="m-0 aspect-square w-5 dark:invert"
          src="/assets/github.svg"
        />
        <b>Found a mistake? Edit on Github!</b>
      </a>
    </div>
  )
}
