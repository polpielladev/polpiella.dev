import TimelineEvent from '@components/TimelineEvent'

export default function Timeline({ title, events }) {
  return (
    <>
      <p className="mb-8">{title}</p>
      <ul className="relative mx-2 list-none border-l border-gray-200 dark:border-gray-700">
        {events.map((event, index) => (
          <TimelineEvent key={index} {...event} />
        ))}
      </ul>
    </>
  )
}
