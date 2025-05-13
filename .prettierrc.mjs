const config = {
  plugins: [
    await import('prettier-plugin-astro'),
    await import('prettier-plugin-tailwindcss'),
  ],
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  bracketSameLine: true,
}

export default config
