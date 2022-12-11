import SubscribeInput from '@components/SubscribeInput'

export default function Subscribe({ hideDescription = false }) {
  return (
    <div className="rounded-sm bg-cyan-200 dark:bg-gray-800 py-4 px-8">
      <p className={`m-0 ${hideDescription ? "mb-4" : ""} text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl`}>
        Subscribe to the iOS CI Newsletter
      </p>
      {!hideDescription && 
        <p className="m-0 mb-4 text-gray-800 dark:text-gray-200">
          A fortnightly independent newsletter gathering all updates and news
          about Continuous Integration and Continuous Delivery from the iOS
          community.
        </p>
      }

      <SubscribeInput />
    </div>
  )
}
