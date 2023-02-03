<script lang="ts">
  export let src: string
  export let controls = true
</script>

<video
  {controls}
  playsInline
  autoPlay
  loop
  class="mx-auto max-h-[800px]"
  {src} />
