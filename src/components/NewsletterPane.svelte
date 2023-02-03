<script lang="ts">
  export let title
  export let children
</script>

<div
  class="prose m-auto flex w-full flex-col px-4 dark:prose-invert sm:max-w-xl">
  <h1 class="m-0 mx-auto">{title}</h1>
  <img
    src="/assets/ci-newsletter.svg"
    class="mx-auto my-0 w-72"
    alt="iOS CI Newsletter logo" />
  {children}
</div>
