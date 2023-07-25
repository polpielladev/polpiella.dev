<script lang="ts">
  const speakingEngagements = [
    {
      event: {
        title: 'iOS Dev UK',
        image: '/assets/conferences/iosdevuk.webp',
        date: '4th - 7th September 2023',
        link: 'https://www.iosdevuk.com/',
      },
      title: 'Making developer tools with Swift',
      description:
        'Learn how you can make cross-platform real-world developer tool systems to accompany iOS and macOS applications using Swift.',
    },
    {
      event: {
        title: 'SwiftLeeds',
        image: '/assets/conferences/swiftleeds.webp',
        date: '9th - 10th October 2023',
        link: 'https://swiftleeds.co.uk/',
      },
      title: 'Delightful Swift CLI applications',
      description: '',
    },
    {
      event: {
        title: '❓ TBA ❓',
        image: '',
        date: 'December 2023',
        link: '',
      },
      title: 'Details coming soon... 👀',
      description: '',
    },
  ]
</script>

<ol class="w-full items-center sm:flex">
  {#each speakingEngagements as engagement}
    <li class="relative mb-6 w-full sm:mb-0 sm:h-full">
      <div class="flex items-center">
        <div
          class="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-lg  ring-2 ring-violet-400  dark:ring-violet-600">
          {#if engagement.event.image}
            <img
              class="h-3.5 w-3.5 rounded-sm"
              alt={`Event logo for ${engagement.event.title}`}
              src={engagement.event.image} />
          {:else}
            <svg
              class="h-3.5 w-3.5 text-violet-800 dark:text-violet-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          {/if}
        </div>
        <div class="hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex" />
      </div>
      <div class="mt-3 sm:pr-8">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={engagement.event.link}>
          <h3
            class="font-title text-lg text-gray-900 transition-colors hover:text-violet-700 dark:text-white dark:hover:text-violet-400">
            {engagement.event.title}
          </h3>
        </a>

        <time
          class="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
          >{engagement.event.date}</time>
        <p class="text-base text-gray-500 dark:text-gray-300">
          {engagement.title}
        </p>
      </div>
    </li>
  {/each}
</ol>
