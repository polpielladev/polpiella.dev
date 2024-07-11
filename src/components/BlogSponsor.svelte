<script lang="ts">
  import { getSponsor } from '../services/sponsors.ts'
  export let variant: 'default' | 'small' = 'default'

  const sponsor = getSponsor(new Date())

  const { title, body, lightModeImage, color, darkModeImage, url } = sponsor
</script>

<div
  style={`border-color: ${color}; background: ${color}10;`}
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col gap-2 content-center justify-center px-2 py-4 text-center'
      : 'grid-cols-[5rem_1fr] p-2 gap-2 align-middle'
  } rounded-lg border-2 shadow-lg `}>
  <div
    style={`background: ${color};`}
    class={`absolute right-2 ${
      variant === 'default' ? 'top-2' : 'top-[-11px]'
    } mx-auto rounded-md px-2 py-0.5 font-title text-xs text-white shadow`}>
    Sponsored
  </div>

  <picture>
    <source srcset={darkModeImage}  media="(prefers-color-scheme: dark)"/>
    <source srcset={lightModeImage}  media="(prefers-color-scheme: light)"/>
    {#if variant === 'default'}
      <img
        width="96"
        height="96"
        class="mx-auto w-24 aspect-square object-contain"
        src={lightModeImage}
        alt="Sponsor Logo" />
    {:else}
      <img
        class={`'w-20' relative mx-auto aspect-square object-contain px-2`}
        src={lightModeImage}
        alt="RevenueCat logo" />
    {/if}
  </picture>


  <div
    class={`${
      variant == 'small' ? 'my-auto max-w-xl' : 'flex flex-col gap-1 max-w-xs'
    }`}>
    <a
      href={url}
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      {title}
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      {body}
    </p>
  </div>
</div>
