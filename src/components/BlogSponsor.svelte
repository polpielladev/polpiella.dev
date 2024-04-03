<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 align-middle'
  } rounded-lg border-2 bg-gray-100 border-violet-700 dark:border-purple-900 dark:bg-gray-900 shadow-lg `}>
  <p
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md bg-violet-700 dark:bg-purple-900 px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </p>

  {#if variant === 'default'}
    <picture>
      <source
        srcset="/assets/sponsors/helm.png"
        media="(prefers-color-scheme: dark)" />
      <img
        width="96"
        height="96"
        class="mx-auto w-24 aspect-square object-contain"
        src="/assets/sponsors/helm.png"
        alt="Helm logo" />
    </picture>
  {:else}
    <img
      class={`'w-20' relative mx-auto aspect-square object-contain px-2`}
      src="/assets/sponsors/helm.png"
      alt="Helm logo" />
  {/if}

  <div
    class={`${
      variant == 'small' ? 'my-auto' : 'flex flex-col gap-1'
    } max-w-xs`}>
    <a
      href="https://hiddevdploeg91.gumroad.com/l/helm"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      Helm for App Store Connect
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      A native app for App Store Connect to make managing your apps faster, simpler and more fun. Get early access now!
    </p>
  </div>
</div>
