<script lang="ts">
  export let image: string
  export let title: string
  export let url: string
  export let description: string
</script>

<div
  class="not-prose relative flex items-start gap-2 rounded-lg border-2 border-violet-400 bg-violet-50/75 p-3 shadow-lg dark:bg-violet-600/20">
  <p
    class="absolute right-2 mx-auto rounded-md bg-violet-300 px-2 py-0.5 font-title text-xs shadow [top:-10px] dark:text-black">
    Sponsored
  </p>

  <img
    class="relative hidden aspect-square w-24 object-contain px-2 sm:block"
    src={image}
    alt="Sponsor logo" />

  <div class="max-w-md">
    <a
      href={url}
      class={`font-title text-lg no-underline hover:underline dark:text-white`}>
      {title}
    </a>
    <p class={`m-0 text-sm leading-relaxed dark:text-gray-300`}>
      {description}
    </p>
  </div>
</div>
