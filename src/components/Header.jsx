export default function Header({ activeNav }) {
  return (
    <header className="mb-8 mt-4">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4">
        <div className="prose flex items-center gap-4 no-underline dark:prose-invert">
          <a
            className={`no-underline text-xl ${
              activeNav == 'index' ? 'dark:text-gray-100 text-gray-900' : 'dark:text-gray-400 text-gray-500'
            }`}
            href="/">
            Home
          </a>
          <a
            className={`no-underline text-xl ${
              activeNav == 'newsletter' ? 'dark:text-gray-100 text-gray-900' : 'dark:text-gray-400 text-gray-500'
            }`}
            href="/newsletter">
            Newsletter
          </a>
        </div>
      </div>
    </header>
  )
}
