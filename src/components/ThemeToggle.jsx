import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')

  const handleClick = () => {
    console.log(theme)
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={handleClick}
      className="aspect-square w-10"
      aria-label={`Enable ${theme == 'light' ? 'dark' : 'light'} mode`}>
      <img
        src={theme === 'light' ? 'assets/moon.svg' : 'assets/sun.svg'}
        alt="Icon depicting the theme to switch to"
      />
    </button>
  )
}
