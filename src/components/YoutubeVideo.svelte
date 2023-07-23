<script lang="ts">
  export let id: string
</script>

<iframe
  class="aspect-video w-full"
  src={`https://www.youtube.com/embed/${id}`}
  title="Youtube Video Playback components"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen />
