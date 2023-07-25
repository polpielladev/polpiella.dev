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
</script>

<div class="flex items-start gap-3">
  <img
    class="not-prose m-0 h-12 w-12 rounded-sm object-contain shadow"
    src={icon ?? '/assets/conferences/placeholder.webp'}
    alt="Conference icon" />
  <div class="flex flex-col gap-1">
    <a href={link}>
      <h3
        class="m-0 font-title text-lg hover:text-violet-700 dark:hover:text-violet-400">
        {event}
      </h3>
    </a>
    <p class="m-0">{title}</p>
    <p class="m-0 text-gray-500">{formatDate(date)}</p>
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
