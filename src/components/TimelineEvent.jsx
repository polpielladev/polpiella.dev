export default function TimelineEvent({
  title,
  company,
  background,
  image,
  description,
  startDate,
  endDate,
}) {
  return (
    <li className="mb-10 ml-5">
      <span
        className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900"
        style={{ backgroundColor: background }}>
        <img className="h-5 w-5" src={image} alt={`${company} Logo`} />
      </span>
      <h3 className="m-0 mb-2 flex items-center font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <h4 className="m-0 mb-2 leading-none">{company}</h4>
      <time className="mb-4 block text-xs font-semibold leading-none text-gray-400 dark:text-gray-300">
        {startDate} - {endDate ?? 'Present'}
      </time>

      <p className="m-0 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  )
}
