import Social from "./Social";

export default function Header() {
    return (
        <header className="w-100 bg-gray-100 mb-16 dark:bg-gray-800 px-4">
            <div className="flex w-100 justify-between mx-auto max-w-screen-lg">
                <a className="hover:scale-105 transition-transform font-bold text-xl dark:text-white flex items-center" href="/">
                    polpiella<span className=" bg-amber-400 p-1 rounded ml-1 text-black">DEV</span>
                </a>
                <Social />
            </div>
        </header>
    )
}