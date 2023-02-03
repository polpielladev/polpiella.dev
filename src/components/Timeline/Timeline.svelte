<script lang="ts">
  import TimelineEvent from '@components/Timeline/TimelineEvent.svelte'
  import type { Event } from './Event'

  export let events: Event[]
  export let title: string
</script>

<div>
  <p class="mb-8">{title}</p>
  <ul
    class="relative mx-2 list-none border-l border-gray-200 dark:border-gray-700">
    {#each events as event}
      <TimelineEvent {event} />
    {/each}
  </ul>
</div>
