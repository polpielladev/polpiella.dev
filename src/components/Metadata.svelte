<script lang="ts">
  export let filePath: string
</script>

<div class="not-prose flex flex-wrap align-middle text-sm">
  <a
    id="gh-link"
    class="relative flex content-center items-center gap-1 no-underline hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    href={`https://github.com/pol-piella/polpiella.dev/edit/main/${filePath}`}>
    <img
      class="m-0 aspect-square w-5 dark:invert"
      src="/assets/github.svg"
      alt="Github Logo" />
    <b>Found a mistake? Edit on Github!</b>
  </a>
</div>
