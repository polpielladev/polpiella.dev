<script lang="ts">
  export let title: string
  export let body: string
</script>

<div
  class="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
  <h1
    class="mb-4 font-title text-4xl leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
    {title}
  </h1>
  <p
    class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
    {body}
  </p>
  <slot />
</div>
