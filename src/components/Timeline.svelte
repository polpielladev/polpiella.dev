<script>
  import TimelineEvent from '@components/TimelineEvent.svelte'

  export let events
  export let title
</script>

<div>
  <p class="mb-8">{title}</p>
  <ul
    class="relative mx-2 list-none border-l border-gray-200 dark:border-gray-700">
    {#each events as event, index}
      <TimelineEvent key={index} {...event} />
    {/each}
  </ul>
</div>
