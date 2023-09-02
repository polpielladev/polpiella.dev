<script lang="ts">
  export let variant: 'default' | 'small' = 'default'
</script>

<div
  class={`not-prose relative grid h-full ${
    variant == 'default'
      ? 'flex-col content-center justify-center p-2 text-center'
      : 'grid-cols-[5rem_1fr] py-1 align-middle'
  } rounded-lg border-2 border-violet-400 bg-violet-50/75 shadow-lg dark:bg-violet-600/20`}>
  <p
    class="absolute right-2 top-2 mx-auto rounded-md bg-violet-300 px-2 py-0.5 font-title text-xs shadow dark:text-black">
    Sponsored
  </p>

  <img
    class={`relative mx-auto aspect-square ${
      variant == 'small' ? 'w-20' : 'w-36'
    } object-contain px-2`}
    src="/assets/sponsors/runway-emoji.webp"
    alt="Runway logo" />

  <div class={`${variant == 'small' ? 'my-auto' : ''} max-w-xs`}>
    <a
      href="https://runway.team/?utm_source=polpiella&utm_medium=sponsorship&utm_campaign=individuals"
      class={`font-title ${
        variant == 'default' ? 'text-lg' : 'text-md'
      } no-underline hover:underline dark:text-white`}>
      Runway: Dare to release on a Friday
    </a>
    <p
      class={`m-0 ${
        variant == 'default' ? 'text-sm' : 'text-xs'
      } text-sm leading-relaxed dark:text-gray-300`}>
      Release management by mobile engineers, for mobile engineers.
    </p>
  </div>
</div>
