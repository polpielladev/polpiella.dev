<script lang="ts">
  export let title: string
  export let event: string
  export let date: Date
  export let link: string
  export let slides: string | null = null
  export let code: string | null = null
  export let video: string | null = null
  export let icon: string | undefined = undefined

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      dateStyle: 'medium',
    })

    return formattedDate
  }

  const now = new Date()
  const dateIsInTheFuture = date > now
</script>

<div class="flex items-start gap-3">
  <img
    class="not-prose m-0 h-12 w-12 rounded-sm object-contain shadow"
    src={icon ?? '/assets/conferences/placeholder.webp'}
    alt="Conference icon" />
  <div class="relative flex flex-col gap-1">
    {#if dateIsInTheFuture}
      <span
        class="absolute -top-7 mr-2 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-violet-800 dark:bg-violet-900 dark:text-purple-300"
        >Upcoming!</span>
    {/if}
    <a href={link}>
      <h3
        class="m-0 font-title text-lg hover:text-violet-700 dark:text-white dark:hover:text-violet-400">
        {event}
      </h3>
    </a>
    <p class="m-0 dark:text-gray-200">{title}</p>
    <p class="m-0 text-gray-500 dark:text-gray-300">{formatDate(date)}</p>
    <div class="flex flex-wrap">
      {#if slides}
        <a href="/">Slides</a>
      {/if}
      {#if code}
        <a href="/">Code</a>
      {/if}
      {#if video}
        <a href="/">Watch</a>
      {/if}
    </div>
  </div>
</div>
