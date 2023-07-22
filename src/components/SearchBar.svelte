<script lang="ts">
  type Searchable = {
    title: string
    excerpt: string
    slug: string
  }

  import Fuse from 'fuse.js'

  export let searchables: Searchable[]
  let searchTerm = ''
  let searchResults: Searchable[] = []

  const fuse = new Fuse(searchables, {
    keys: ['title', 'excerpt', 'headings'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  })

  function onInput({ currentTarget }: { currentTarget: HTMLInputElement }) {
    searchTerm = currentTarget.value
    searchResults =
      currentTarget.value.length > 1
        ? fuse
            .search(searchTerm)
            .slice(0, 5)
            .map((result) => result.item)
        : []
  }
</script>

<div class="relative ml-4 hidden w-96 sm:block">
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
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute right-1 top-1/2 translate-y-[-50%] stroke-gray-400 text-white">
      <path
        d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </div>

  <div class="absolute z-30">
    {#each searchResults as searchable}
      <a href={`/${searchable.slug}`}>
        <div
          class="flex cursor-pointer flex-col gap-1 bg-gray-100 p-4 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          <header class="font-title text-lg text-gray-900 dark:text-gray-100">
            {searchable.title}
          </header>
          <p class="text-sm leading-snug text-gray-700 dark:text-gray-300">
            {searchable.excerpt}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
