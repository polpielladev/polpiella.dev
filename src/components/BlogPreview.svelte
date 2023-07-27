<script lang="ts">
  export let slug: string
  export let title: string
  export let excerpt: string
  export let pubDate: Date
  export let isNew: boolean = false

  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  })
</script>

<div class="relative flex max-w-[650px] flex-col gap-2">
  {#if isNew}
    <span
      class="absolute -top-7 mr-2 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-violet-800 dark:bg-violet-900 dark:text-purple-300"
      >New!</span>
  {/if}
  <h4
    class="text-theme-primary m-0 font-title text-xl hover:text-violet-700 dark:text-gray-100 dark:hover:text-violet-400">
    <a href={`/${slug}`} {title}>{title}</a>
  </h4>
  <p class="hyphens-auto text-lg leading-6 line-clamp-3 dark:text-gray-400">
    {excerpt}
  </p>
  <time
    datetime={pubDate.toDateString()}
    class="block text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
    {formattedDate}
  </time>
</div>
