import rss from '@astrojs/rss'

export const get = () =>
  rss({
    title: "Pol Piella's Blog",
    description: 'A blog about iOS app development, software development, and other things.',
    site: 'https://polpiella.dev',
    items: import.meta.glob('./*.md'),
    customData: `<language>en-us</language>`,
  })
