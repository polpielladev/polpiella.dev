import Social from './Social'

export default function Footer() {
  return (
    <footer className="mt-16 mb-0 flex flex-col bg-gray-100 align-middle dark:bg-gray-800">
      <div className="p-5">
        <Social />
      </div>
      <p className=" mb-5 text-center text-gray-600 dark:text-gray-300">
        Made with 💛 by Pol Piella Abadia
      </p>
    </footer>
  )
}
