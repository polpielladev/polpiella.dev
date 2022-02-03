export default function Header() {
    return (
        <header className="flex bg-gray-100 mb-16 align-middle dark:bg-gray-800">
            <a className="hover:scale-105 transition-transform font-bold text-xl p-5 dark:text-white" href="/">
                polpiella<span className=" bg-amber-400 p-1 rounded ml-1 text-black">DEV</span>
            </a>
        </header>
    )
}