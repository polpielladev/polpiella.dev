import Social from "./Social"

export default function Footer() {
    return (
        <footer className="flex flex-col mt-16 align-middle bg-gray-100 mb-0 dark:bg-gray-800">
            <Social />
            <p className=" text-center text-gray-600 mb-1 dark:text-gray-300">Made with 💛 by Pol Piella Abadia</p>
            <p className=" text-center text-gray-600 mb-5 dark:text-gray-300">Code block font: <a className="underline font-bold hover:text-amber-500 decoration-amber-400 decoration-wavy" href="https://www.monolisa.dev/buy" target="_blank" rel="noopener noreferrer">MonoLisa</a></p>
        </footer>
    )
}