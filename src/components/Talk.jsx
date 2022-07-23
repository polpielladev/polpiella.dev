export default function Talk({ title, location, excerpt, slides }) {
  return (
    <div className="grid justify-items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="max-w-sm">
        <h2 className="m-0 mb-1 font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <h4 className="m-0 mb-3 text-gray-400 dark:text-gray-300">
          📍 {location}
        </h4>
        <p className=" m-0 mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
          {excerpt}
        </p>
        {slides && (
          <a
            href={slides}
            className="m-0 inline-flex items-center rounded-lg bg-blue-700 py-2 px-3 text-center text-sm font-medium text-white no-underline hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Download Slides
          </a>
        )}
      </div>
    </div>
  )
}
