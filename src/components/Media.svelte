<script lang="ts">
  export let href: string
  export let thumbnail: string
  export let title: string
</script>

<a
  {href}
  class="flex flex-col gap-4 rounded-lg p-2 no-underline hover:bg-gray-200 dark:hover:bg-gray-800">
  <img
    alt={`Thumbnail for ${title} video`}
    width="304px"
    height="171px"
    class="m-0 aspect-video object-cover"
    src={thumbnail} />
  <p class="m-0">
    {title}
  </p>
</a>
