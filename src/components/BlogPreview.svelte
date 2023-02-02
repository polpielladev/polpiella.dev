<script>
  export let slug
  export let title
  export let excerpt
  export let pubDate

  const formattedDate = new Date(pubDate).toDateString()
</script>

<div class="prose flex w-full flex-col dark:prose-invert">
  <p class=" m-0 text-sm font-semibold text-zinc-500 dark:text-zinc-300">
    {formattedDate}
  </p>
  <div class="flex flex-col gap-2">
    <a href={`/${slug}`} class="m-0 rounded no-underline">
      <h2 class="m-0 max-w-md hover:underline">{title}</h2>
    </a>
    <p class="m-0">{excerpt}</p>
  </div>
</div>
