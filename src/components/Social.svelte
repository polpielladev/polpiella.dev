<script lang="ts">
  const SOCIAL_MEDIA = [
    {
      asset: '/assets/github.svg',
      url: 'https://github.com/polpielladev',
      alt: 'GitHub Logo',
      rel: '',
    },
    {
      asset: '/assets/linkedin.svg',
      url: 'https://www.linkedin.com/in/polpielladev',
      alt: 'Linkedin Logo',
      rel: '',
    },
    {
      asset: '/assets/twitter.svg',
      url: 'https://twitter.com/polpielladev',
      alt: 'Twitter Logo',
      rel: '',
    },
    {
      asset: '/assets/mastodon.svg',
      url: 'https://iosdev.space/@polpielladev',
      alt: 'Mastodon Logo',
      rel: 'me',
    },
  ]

  export let size = 25
</script>

<div class="flex gap-8">
  {#each SOCIAL_MEDIA as social}
    <a
      class="transition-transform hover:scale-110 dark:invert"
      target="_blank"
      rel={`noopener noreferrer ${social.rel}`}
      href={social.url}>
      <img
        width={`${size}px`}
        height={`${size}px`}
        class="m-0"
        src={social.asset}
        alt={social.alt} />
    </a>
  {/each}
</div>
