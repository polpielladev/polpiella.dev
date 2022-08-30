const SOCIAL_MEDIA = [
  {
    asset: '/assets/github.svg',
    url: 'https://github.com/pol-piella',
    alt: 'Github Logo',
  },
  {
    asset: '/assets/linkedin.svg',
    url: 'https://www.linkedin.com/in/pol-piella-81b846115/',
    alt: 'Linkedin Logo',
  },
  {
    asset: '/assets/twitter.svg',
    url: 'https://twitter.com/polpielladev',
    alt: 'Twitter Logo',
  },
]

export default function Social() {
  return (
    <div className="flex justify-center gap-8 align-middle">
      {SOCIAL_MEDIA.map((social) => (
        <a
          className="transition-transform hover:scale-110 dark:invert"
          key={social.url}
          target="_blank"
          rel="noopener noreferrer"
          href={social.url}>
          <img width="25px" height="25px" src={social.asset} alt={social.alt} />
        </a>
      ))}
    </div>
  )
}
