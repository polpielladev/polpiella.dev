export default function TimelineEvent({
  title,
  company,
  background,
  image,
  description,
  metadataLink,
  startDate,
  endDate,
}) {
  return (
    <li class="mb-10 ml-5">
      <span
        class="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900"
        style={{ backgroundColor: background }}>
        <img className="h-5 w-5" src={image} />
      </span>
      <h3 class="m-0 mb-2 flex items-center font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <h4 class="m-0 mb-2 leading-none">{company}</h4>
      <time class="mb-4 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {startDate} - {endDate ?? 'Present'}
      </time>

      <p class="m-0 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      {metadataLink && (
        <a
          href="#"
          class="inline-flex items-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
          <svg
            class="mr-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clip-rule="evenodd"></path>
          </svg>{' '}
          Download ZIP
        </a>
      )}
    </li>
  )
}
