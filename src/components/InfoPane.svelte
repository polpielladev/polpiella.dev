<script lang="ts">
  import Social from '@components/Social.svelte'

  export let title: string
  export let subtitle: string | null = null
  export let image: string
  export let alt: string
  export let description: string
  export let circleImage = false
</script>

<div class="flex w-full flex-col gap-8 text-left md:flex-row">
  <img
    class={`m-0 h-28 w-28 ${
      circleImage ? 'rounded-full' : ''
    } block justify-start object-cover md:hidden`}
    src={image}
    {alt} />
  <div class="prose grid content-center dark:prose-invert">
    <div class="mb-4">
      <h1
        class={`m-0 ${
          !subtitle ? 'mb-2' : ''
        } overflow-hidden pt-4 pb-2 text-4xl font-bold md:text-5xl`}>
        <span
          class="
              bg-gradient-to-bl from-cyan-200 to-cyan-200 bg-[length:90%_40%]
              bg-bottom bg-no-repeat dark:from-cyan-700 dark:to-cyan-700
          ">
          {title}
        </span>
      </h1>
      <!-- <h1 class={`m-0 ${subtitle == null ? 'mb-4' : ''}`}>{title}</h1> -->
      {#if subtitle}
        <h2
          class="m-0 mb-2 text-lg font-normal text-gray-600 dark:text-gray-200">
          {subtitle}
        </h2>
      {/if}
      <Social size={24} />
    </div>
    <p class="m-0 text-gray-500 dark:text-gray-400">{description}</p>
  </div>
  <img
    class={`m-0 aspect-square h-40 w-40 ${
      circleImage ? 'rounded-full' : ''
    } hidden object-cover md:block`}
    src={image}
    {alt} />
</div>
