import Social from './Social'

export default function Footer() {
  return (
    <footer className="mt-16 mb-0 flex flex-col bg-gray-100 align-middle dark:bg-gray-800">
      <Social />
      <p className=" mb-1 text-center text-gray-600 dark:text-gray-300">
        Made with 💛 by Pol Piella Abadia
      </p>
      <p className=" mb-5 text-center text-gray-600 dark:text-gray-300">
        Code block font:{' '}
        <a
          className="font-bold underline decoration-amber-400 decoration-wavy hover:text-amber-500"
          href="https://www.monolisa.dev/buy"
          target="_blank"
          rel="noopener noreferrer">
          MonoLisa
        </a>
      </p>
    </footer>
  )
}
