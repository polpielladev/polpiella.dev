export default function NewsletterPane({ title, children }) {
  return (
    <div class="prose m-auto flex w-full flex-col px-4 dark:prose-invert sm:max-w-xl">
      <h1 class="m-0 mx-auto">{title}</h1>
      <img src="/assets/ci-newsletter.svg" class="mx-auto my-0 w-72" />
      {children}
    </div>
  )
}
