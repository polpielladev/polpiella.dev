import rss from '@astrojs/rss'

export const get = () =>
  rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: import.meta.env.SITE,
    items: import.meta.glob('./*.md'),
    customData: `<language>en-us</language>`,
  })
