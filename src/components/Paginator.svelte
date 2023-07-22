<script lang="ts">
  export let previousURL: string
  export let nextURL: string
</script>

<div class="flex justify-start gap-3 dark:text-gray-100">
  {#if previousURL != undefined}
    <a
      class="rounded bg-slate-100 p-2 font-bold transition-colors hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"
      href={previousURL == '' ? '/' : previousURL}>
      &larr; Newer articles
    </a>
  {/if}
  {#if nextURL}
    <a
      class="rounded bg-slate-100 p-2 font-bold transition-colors hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"
      href={nextURL}>
      Older articles &rarr;
    </a>
  {/if}
</div>
