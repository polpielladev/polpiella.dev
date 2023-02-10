<script lang="ts">
  export let title: string
  export let event: string
  export let date: string
  export let slides: string | null = null
  export let code: string | null = null
  export let video: string | null = null
  export let icon: string | null = null
</script>

<div class="flex items-start gap-3">
  <img
    class="not-prose m-0 mt-2 aspect-square w-12 rounded-sm object-contain"
    src={icon ?? '/assets/conferences/placeholder.webp'}
    alt="Conference icon" />
  <div class="flex flex-col gap-1">
    <h3 class="m-0">{title}</h3>
    <p class="m-0">{`📍 ${event}`}</p>
    <p class="m-0">{`🗓️ ${date}`}</p>
    <div class="flex flex-wrap gap-2">
      {#if slides}
        <a href="/">Slides</a>
      {/if}
      {#if code}
        <a href="/">Code</a>
      {/if}
      {#if video}
        <a href="/">Watch</a>
      {/if}
    </div>
  </div>
</div>
