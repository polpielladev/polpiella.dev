<script lang="ts">
  export let slug: string
  export let title: string
  export let excerpt: string
  export let pubDate: Date

  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  })
</script>

<div class="flex max-w-[650px] flex-col gap-3">
  <h4
    class="text-theme-primary m-0 text-xl font-semibold hover:underline dark:text-gray-100">
    <a href={`/${slug}`} {title}>{title}</a>
  </h4>
  <p class="hyphens-auto text-lg leading-6 line-clamp-3 dark:text-gray-400">
    {excerpt}
  </p>
  <time
    datetime={pubDate.toDateString()}
    class="block text-sm text-zinc-400 sm:text-base">
    {formattedDate}
  </time>
</div>
