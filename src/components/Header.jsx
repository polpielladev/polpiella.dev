import Social from '@components/Social'

export default function Header() {
  return (
    <header className="mb-16 bg-gray-100 px-4 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4">
        <a
          className="text-md flex items-center font-bold transition-transform hover:scale-105 dark:text-white sm:text-xl"
          href="/">
          polpiella
          <span className=" ml-1 rounded bg-amber-400 p-1 text-black">DEV</span>
        </a>
        <div className="hidden sm:block">
          <Social />
        </div>
        <div className="prose flex items-center gap-3 no-underline dark:prose-invert">
          <a href="/about">About</a>
          <a href="/newsletter">Newsletter</a>
        </div>
      </div>
    </header>
  )
}
