<script>
  import SubscribeInput from '@components/SubscribeInput.svelte'

  export let hideDescription = false
</script>

<div
  class={`not-prose relative flex flex-col rounded-lg bg-gray-100 px-5 py-4 dark:bg-gray-800 ${
    hideDescription ? 'gap-3' : 'gap-5'
  }`}>
  <header class="flex flex-col gap-1">
    <div class="flex items-center gap-2">
      <img
        src="/assets/mail-icon.svg"
        class="m-0 aspect-square w-6 dark:invert"
        alt="Email icon representing an email newsletter" />
      <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        iOS CI Newsletter
      </p>
    </div>

    {#if !hideDescription}
      <p class="m-0 text-gray-800 dark:text-gray-200">
        A fortnightly independent newsletter gathering all updates and news
        about Continuous Integration and Continuous Delivery from the iOS
        community.
      </p>
    {/if}
  </header>

  <SubscribeInput />
</div>
