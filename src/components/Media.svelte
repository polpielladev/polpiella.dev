<script lang="ts">
  export let href: string
  export let thumbnail: string
  export let title: string
</script>

<a
  {href}
  class="flex flex-col gap-4 rounded-lg p-2 align-middle no-underline hover:bg-gray-200 dark:hover:bg-gray-800">
  <img
    alt={`Thumbnail for ${title} video`}
    class="max-h-200 m-0 aspect-video object-cover"
    src={thumbnail} />
  <p class="m-0 font-title text-xl dark:text-white">
    {title}
  </p>
</a>
