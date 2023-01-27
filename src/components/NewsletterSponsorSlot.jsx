export default function NewsletterSponsorSlot({ title }) {
  return (
    <section className="relative mb-5 flex flex-col gap-4 rounded-lg border-2 border-gray-300 p-4 dark:border-gray-800 sm:flex-row sm:items-center">
      <p className="text-md absolute right-6 -top-3.5 m-0 rounded-lg bg-gray-300 px-2 font-medium dark:bg-gray-800">
        SPONSORED
      </p>

      <img
        className="relative m-0 aspect-square w-36 px-2 dark:invert"
        src="/assets/sponsors/runway.svg"
      />

      <div className="flex flex-col gap-2">
        <a
          href="https://www.runway.team"
          className="text-lg font-semibold no-underline hover:underline dark:text-white">
          {title}
        </a>
        <p className="m-0">
          No more cat-herding, spreadsheets, or steady drip of manual busywork.{' '}
          <a href="https://www.runway.team">Runway</a> helps your team level-up
          your release coordination and automation, from kickoff to release to
          rollout.{' '}
          <a href="https://www.runway.team">Get started for free &rarr;</a>
        </p>
      </div>
    </section>
  )
}
