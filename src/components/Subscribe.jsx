import SubscribeInput from '@components/SubscribeInput'

export default function Subscribe({ hideDescription = false }) {
  return (
    <div className="not-prose relative flex flex-col gap-4 rounded-sm bg-gray-100 px-8 py-4 dark:bg-gray-800">
      <header className="flex items-center gap-2">
        <img src="/assets/mail-icon.svg" className="m-0 aspect-square w-6" />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          iOS CI Newsletter
        </p>
      </header>

      {!hideDescription && (
        <p className="m-0 text-gray-800 dark:text-gray-200">
          A fortnightly independent newsletter gathering all updates and news
          about Continuous Integration and Continuous Delivery from the iOS
          community.
        </p>
      )}

      <SubscribeInput />
    </div>
  )
}
