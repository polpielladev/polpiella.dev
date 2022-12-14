export default function NewsletterPane({ title, children }) {
  return (
    <div className="prose m-auto flex w-full flex-col px-4 dark:prose-invert sm:max-w-xl">
      <h1 className="m-0 mx-auto">{title}</h1>
      <img src="/assets/ci-newsletter.svg" className="mx-auto my-0 w-72" />
      {children}
    </div>
  )
}
