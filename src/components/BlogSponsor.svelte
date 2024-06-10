<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col gap-2 content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 gap-2 align-middle'
  } rounded-lg border-2 border-[#f2545b] bg-[#f2545b]/10 shadow-lg `}>
  <div
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md bg-[#f2545b] px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </div>

  {#if variant === 'default'}
    <picture>
      <source
        srcset="/assets/sponsors/codemagic-wordmark-white.svg"
        media="(prefers-color-scheme: dark)" />
      <img
        width="96"
        height="96"
        class="mx-auto w-24 aspect-square object-contain"
        src="/assets/sponsors/rc.png"
        alt="RevenueCat logo" />
    </picture>
  {:else}
    <img
      class={`'w-20' relative mx-auto aspect-square object-contain px-2`}
      src="/assets/sponsors/rc.png"
      alt="RevenueCat logo" />
  {/if}

  <div
    class={`${
      variant == 'small' ? 'my-auto' : 'flex flex-col gap-1'
    } max-w-xs`}>
    <a
      href="https://www.revenuecat.com/docs/tools/paywalls?utm_medium=sponsored&utm_source=polpiella.dev&utm_campaign=general_sponsorship&utm_content=revenuecat-paywalls-banner"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      RevenueCat Paywalls
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      Add paywalls to your iOS app's in one line of code! With RevenueCat Paywalls you can remotely configure and edit your entire paywall view without waiting on App Review.
    </p>
  </div>
</div>
