import SubscribeInput from '@components/SubscribeInput'

export default function Subscribe({ hideDescription = false }) {
  return (
    <div
      className={`not-prose relative flex flex-col rounded-lg bg-gray-100 px-5 py-4 dark:bg-gray-800 ${
        hideDescription ? 'gap-3' : 'gap-5'
      }`}>
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img src="/assets/mail-icon.svg" className="m-0 aspect-square w-6" />
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            iOS CI Newsletter
          </p>
        </div>

        {!hideDescription && (
          <p className="m-0 text-gray-800 dark:text-gray-200">
            A fortnightly independent newsletter gathering all updates and news
            about Continuous Integration and Continuous Delivery from the iOS
            community.
          </p>
        )}
      </header>

      <SubscribeInput />
    </div>
  )
}
