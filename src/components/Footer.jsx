import Social from '@components/Social'

export default function Footer() {
  return (
    <footer className="mt-16 mb-0 flex flex-col align-middle">
      <hr className="mb-4 w-full" />
      <div className="flex w-full justify-center p-5 align-middle">
        <Social />
      </div>
      <p className=" mb-5 text-center text-gray-600 dark:text-gray-300">
        Made with 💛 by Pol Piella Abadia
      </p>
    </footer>
  )
}
