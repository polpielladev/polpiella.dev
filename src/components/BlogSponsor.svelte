<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col gap-2 content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 gap-2 align-middle'
  } rounded-lg border-2 border-[#5BC69B] bg-[#5BC69B]/10 shadow-lg `}>
  <p
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md bg-[#5BC69B] px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </p>

  {#if variant === 'default'}
  
      <img
        width="96"
        height="96"
        class="mx-auto w-24 aspect-square object-contain"
        src="/assets/sponsors/zenitizer.png"
        alt="Zenitizer logo" />
  {:else}
    <img
      class={`'w-20' relative mx-auto aspect-square object-contain px-2`}
      src="/assets/sponsors/zenitizer.png"
      alt="Zenitizer logo" />
  {/if}

  <div
    class={`${
      variant == 'small' ? 'my-auto w-full' : 'flex flex-col gap-0'
    } max-w-lg`}>
    <a
      href="https://apps.apple.com/us/app/meditation-timer-zenitizer/id6444767911?utm_medium=sponsored&utm_source=polpiella.dev&utm_campaign=general_sponsorship&utm_content=zenitizer-banner"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      Zenitizer - Meditation Timer
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      Enjoy clutter-free meditation with Zenitizer's clean UI and soothing sounds. For Apple geeks: Shortcuts, Apple Health, widgets and fully-featured watchOS and visionOS apps! Get 25% OFF with code: POL24
    </p>
  </div>
</div>
