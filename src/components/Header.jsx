import Social from '@components/Social'

export default function Header() {
  return (
    <header className="mb-8 mt-4">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-4 py-4">
        <div className="prose flex items-center gap-3 no-underline dark:prose-invert">
          <a href="/">Home</a>
          <a href="/newsletter">Newsletter</a>
        </div>
      </div>
    </header>
  )
}
