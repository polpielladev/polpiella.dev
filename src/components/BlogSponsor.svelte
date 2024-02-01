<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 align-middle'
  } rounded-lg border-2 border-[#0051FF] bg-[#0051FF]/10 shadow-lg `}>
  <p
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md bg-[#0051FF] px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </p>

  {#if variant === 'default'}
    <picture>
      <source
        srcset="/assets/sponsors/codemagic-wordmark-white.svg"
        media="(prefers-color-scheme: dark)" />
      <img
        class=" mx-auto w-64 object-contain pb-4 pt-7"
        src="/assets/sponsors/codemagic-wordmark-blue.svg"
        alt="Codemagic logo" />
    </picture>
  {:else}
    <img
      class={`'w-20' relative mx-auto aspect-square object-contain px-2`}
      src="/assets/sponsors/codemagic-star.svg"
      alt="Codemagic logo" />
  {/if}

  <div
    class={`${
      variant == 'small' ? 'my-auto' : 'flex flex-col gap-1'
    } max-w-xs`}>
    <a
      href="https://codemagic.io/start/?utm_source=pol_piella&utm_medium=blog&utm_campaign=pol_piella"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      Codemagic CI/CD for mobile teams
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      What do you get when you put love for iOS and DevOps together? Answer:
      Codemagic CI/CD
    </p>
  </div>
</div>
