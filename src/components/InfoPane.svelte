<script lang="ts">
  import Social from './Social.svelte'

  export let title: string
  export let subtitle: string | null = null
  export let image: string
  export let alt: string
  export let description: string
  export let circleImage = false
</script>

<div class="flex w-full flex-col text-left md:gap-8 xl:flex-row">
  <img
    class={`m-0 h-28 w-28 ${
      circleImage ? 'rounded-full' : ''
    } block justify-start object-cover`}
    src={image}
    {alt} />
  <div class="prose grid content-center dark:prose-invert">
    <div class="flex flex-col gap-3">
      <h1 class="m-0 overflow-hidden text-4xl font-bold md:text-5xl">
        {title}
      </h1>
      <div class="block lg:hidden">
        <Social />
      </div>
      {#if subtitle}
        <h2 class="m-0 text-lg font-normal text-gray-600 dark:text-gray-200">
          {subtitle}
        </h2>
      {/if}
      <p class="m-0 text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
</div>
