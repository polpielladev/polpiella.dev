export default function Talk({ title, location, excerpt, slides = null }) {
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
            className="m-0 inline-flex items-center rounded-lg bg-amber-400 py-2 px-4 text-center text-sm font-bold text-black no-underline hover:bg-amber-300 focus:outline-none focus:ring-4">
            Download Slides &darr;
          </a>
        )}
      </div>
    </div>
  )
}
