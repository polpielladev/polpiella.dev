<script lang="ts">
  export let name: string
  export let controls = true

  const src = `https://d2thv89fb05cma.cloudfront.net/polpiella.dev/videos/${name}`
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  {controls}
  playsInline
  autoPlay
  loop
  class="mx-auto max-h-[800px]"
  {src} />
