<script>
  import Fuse from 'fuse.js'

  export let searchables
  let searchTerm = ''
  let searchResults = []

  const fuse = new Fuse(searchables, {
    keys: ['title', 'excerpt', 'headings'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  })

  function onInput(e) {
    searchTerm = e.currentTarget.value
    searchResults =
      e.currentTarget.value.length > 1
        ? fuse.search(searchTerm).slice(0, 5)
        : []
  }
</script>

<div class="relative ml-4 hidden flex-grow sm:block">
  <div class="relative">
    <input
      aria-label="Search articles"
      type="text"
      placeholder="Search articles"
      class="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      on:input={onInput}
      autoComplete="off" />
    <svg
      width="24px"
      height="24px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute top-1/2 right-1 translate-y-[-50%] stroke-gray-400 text-white">
      <path
        d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  </div>

  <div class="absolute z-30">
    {#each searchResults as result}
      <a href={`/${result.item.slug}`}>
        <div
          class="flex cursor-pointer flex-col gap-1 bg-gray-100 p-4 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          <header
            key={result.item.slug}
            class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {result.item.title}
          </header>
          <p class="text-sm leading-snug text-gray-700 dark:text-gray-300">
            {result.item.excerpt}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
