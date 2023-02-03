<script>
  export let title
  export let event
  export let date
  export let slides = null
  export let code = null
  export let video = null
</script>

<div class="flex gap-1">
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
