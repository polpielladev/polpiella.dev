<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 align-middle'
  } rounded-lg border-2 border-[#E52B50] bg-[#E52B50]/10 shadow-lg `}>
  <p
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md bg-[#E52B50] px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </p>

  <img
    class={`relative mx-auto aspect-square ${
      variant == 'small' ? 'w-20' : 'w-36'
    } object-contain px-2`}
    src="/assets/sponsors/statused.webp"
    alt="Runway logo" />

  <div class={`${variant == 'small' ? 'my-auto' : ''} max-w-xs`}>
    <a
      href="https://statused.com"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      No more 'Is the app live yet?'
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      Receive the status of your Android & iOS app review, build and TestFlight,
      directly on Slack.
    </p>
  </div>
</div>
