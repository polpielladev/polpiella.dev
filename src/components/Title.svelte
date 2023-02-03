<script>
  export let title
  export let date

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    dateStyle: 'full',
  })
</script>

<header class=" mb-4 flex flex-col items-center justify-center gap-1">
  <h2 class="m-0 text-center font-sans text-2xl font-semibold sm:text-3xl">
    {title}
  </h2>
  <time
    datetime={date}
    class="mb-3 block text-center text-sm text-zinc-400 sm:text-base">
    {formattedDate}
  </time>
</header>
