import Social from '@components/Social'

export default function InfoPane({
  title,
  subtitle = null,
  image,
  alt,
  description,
  circleImage = true,
}) {
  return (
    <div className="flex w-full flex-col gap-8 text-left md:flex-row">
      <img
        className={`m-0 h-28 w-28 ${
          circleImage ? 'rounded-full' : ''
        } block justify-start object-cover md:hidden`}
        src={image}
        alt={alt}
      />
      <div className="prose grid content-center dark:prose-invert">
        <div className="mb-4">
          <h1 className={`m-0 ${subtitle == null ? 'mb-4' : ''}`}>{title}</h1>
          {subtitle && (
            <h2 className="m-0 mb-2 text-lg font-normal text-gray-600 dark:text-gray-200">
              {subtitle}
            </h2>
          )}
          <Social size={24} />
        </div>
        <p className="m-0 text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <img
        className={`m-0 aspect-square h-40 w-40 ${
          circleImage ? 'rounded-full' : ''
        } hidden object-cover md:block`}
        src={image}
        alt={alt}
      />
    </div>
  )
}
