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
    <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
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
        className={`m-0 aspect-square w-40 ${
          circleImage ? 'rounded-full' : ''
        } object-cover`}
        src={image}
        alt={alt}
      />
    </div>
  )
}
