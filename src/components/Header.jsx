import Social from './Social'

export default function Header() {
  return (
    <header className="w-100 mb-16 bg-gray-100 px-4 dark:bg-gray-800">
      <div className="w-100 mx-auto flex max-w-screen-lg items-center justify-between gap-4">
        <a
          className="flex items-center text-xl font-bold transition-transform hover:scale-105 dark:text-white"
          href="/">
          polpiella
          <span className=" ml-1 rounded bg-amber-400 p-1 text-black">DEV</span>
        </a>
        <Social />
        <div className="prose flex items-center gap-3 no-underline dark:prose-invert">
          <a className="no-underline" href="/about">
            About me
          </a>
          <a
            href="mailto:hi@polpiella.dev"
            className="m-0 inline-flex items-center rounded-lg bg-amber-400 py-2 px-4 text-center text-sm font-bold text-black no-underline hover:bg-amber-300 focus:outline-none focus:ring-4">
            Contact Me
          </a>
        </div>
      </div>
    </header>
  )
}
