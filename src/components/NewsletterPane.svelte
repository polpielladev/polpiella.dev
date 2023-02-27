<script lang="ts">
  export let title: string
  export let success: boolean = false
</script>

<div class="prose m-auto flex w-full flex-col px-4 dark:prose-invert">
  <h1 class="m-0 mx-auto">{title}</h1>
  <img
    src="/assets/ci-newsletter.svg"
    class="mx-auto my-0 w-72"
    alt="iOS CI Newsletter logo" />
  {#if success}
    <h3 class="mt-0">ℹ️ Before you go:</h3>
    <p>
      Here are some extra steps you can do in your email client to ensure you
      don't miss a single issue from the iOS CI Newsletter (
      <strong>hi@polpiella.dev</strong>):
    </p>
    <ul class="mt-0">
      <li>
        <strong>Gmail:</strong> Add <strong>hi@polpiella.dev</strong> to your primary
        inbox.
      </li>
      <li>
        <strong>Apple Mail:</strong> Add <strong>hi@polpiella.dev</strong> as a VIP
        contact.
      </li>
      <li>
        <strong>Outlook:</strong> Add <strong>hi@polpiella.dev</strong> as a favourite.
      </li>
    </ul>
  {/if}

  {#if !success}
    <p class="text-center">
      <strong>You've successfully unsubscribed</strong>. Remember that you can
      resubscribe at any point by going to the
      <a href="/newsletter">newsletter page</a>.
    </p>
  {/if}

  <slot />
</div>
