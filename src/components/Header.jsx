import Social from './Social'

export default function Header() {
  return (
    <header className="w-100 mb-16 bg-gray-100 px-4 dark:bg-gray-800">
      <div className="w-100 mx-auto flex max-w-screen-lg justify-between">
        <a
          className="flex items-center text-xl font-bold transition-transform hover:scale-105 dark:text-white"
          href="/"
        >
          polpiella
          <span className=" ml-1 rounded bg-amber-400 p-1 text-black">DEV</span>
        </a>
        <Social />
      </div>
    </header>
  )
}
