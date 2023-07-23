<script lang="ts">
  import LiteYouTube from 'svelte-lite-youtube-embed'
  export let id: string
</script>

<LiteYouTube videoId={id} />
