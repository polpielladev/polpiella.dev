export default function Header({ activeNav }) {
  return (
    <header className="mb-8 mt-4">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4">
        <div className="prose flex items-center gap-4 no-underline dark:prose-invert">
          <a
            className={`no-underline ${
              activeNav == 'index' ? 'text-gray-100' : 'text-gray-400'
            }`}
            href="/">
            Home
          </a>
          <a
            className={`no-underline ${
              activeNav == 'newsletter' ? 'text-gray-100' : 'text-gray-400'
            }`}
            href="/newsletter">
            Newsletter
          </a>
        </div>
      </div>
    </header>
  )
}
