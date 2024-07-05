<script lang="ts">
  export let src: string
  export let controls = true
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  {controls}
  playsInline
  autoPlay
  loop
  class="mx-auto max-h-[800px]"
  {src} />
