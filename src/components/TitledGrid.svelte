<script lang="ts">
  interface Disclose {
    title: string
    link: string
  }
  export let title: string
  export let disclose: Disclose | undefined = undefined
  export let responsive: boolean = true
  export let offsetTop: boolean = false
</script>

<section class="flex flex-col gap-6">
  <div>
    <div class="flex justify-between">
      <h2 class="flex pb-1 font-title text-2xl dark:text-gray-50">
        {title}
      </h2>
      {#if disclose}
        <a
          href={disclose.link}
          class="flex items-center gap-0.5 stroke-current text-violet-500 hover:text-violet-600 hover:underline dark:text-violet-200 dark:hover:text-violet-100">
          {disclose.title}
          <svg
            class="w-4"
            width="24px"
            height="24px"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="current"
            ><path
              d="M9 6l6 6-6 6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </a>
      {/if}
    </div>

    <hr />
  </div>

  <div
    class={`grid gap-6 ${offsetTop ? 'pt-4' : ''} ${
      responsive ? 'sm:grid-cols-2 lg:grid-cols-3' : ''
    }`}>
    <slot />
  </div>
</section>
