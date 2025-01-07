<script lang="ts">
  import { getSponsor } from '../services/sponsors.ts'
  import { track } from '@vercel/analytics'
  export let variant: 'default' | 'small' = 'default'

  const sponsor = getSponsor(new Date())

  const { title, body, images, color, url } = sponsor
  const { large, small } = images
</script>

<div
  style={`border-color: ${color}; background: ${color}10;`}
  class={`not-prose relative grid h-full ${
    variant === 'default'
      ? 'flex-col gap-4 content-center justify-center px-2 py-4 text-center'
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
    {#if variant === 'default'}
      <source srcset={large.darkModeImage}  media="(prefers-color-scheme: dark)"/>
      <source srcset={large.lightModeImage}  media="(prefers-color-scheme: light)"/>
      <img
        class={`mx-auto h-20 object-contain`}
        style={`aspect-ratio: ${large.aspectRatio}`}
        src={large.lightModeImage}
        alt="Sponsor Logo" />
    {:else}
      <source srcset={small.darkModeImage}  media="(prefers-color-scheme: dark)"/>
      <source srcset={small.lightModeImage}  media="(prefers-color-scheme: light)"/>
      <img
        class={`h-20 relative mx-auto object-contain px-2`}
        style={`aspect-ratio: ${small.aspectRatio}`}
        src={small.lightModeImage}
        alt="RevenueCat logo" />
    {/if}
  </picture>


  <div
    class={`${
      variant == 'small' ? 'my-auto max-w-xl' : 'flex flex-col gap-1 max-w-xs'
    }`}>
    <button
      type="button"
      on:click={(e) => {
        track('sponsor_click', { url, variant }) 
        if (e.metaKey) {
          window.open(url, "_blank");
        } else {
          history.pushState({}, '', url)
        }
      }}
      class={`font-title ${
        variant == 'default' ? 'text-lg leading-tight' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      {title}
    </button>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      {body}
    </p>
  </div>
</div>
