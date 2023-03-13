<script lang="ts">
  export let slug: string
  export let title: string
  export let excerpt: string
  export let pubDate: Date

  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const getMonthName = (date: Date) => MONTHS[new Date(date).getMonth()]
</script>

<div class="flex sm:gap-6">
  <div>
    <div class="hidden w-full flex-col text-center sm:flex">
      <span class="text-6xl font-semibold text-gray-500 dark:text-gray-300"
        >{new Date(pubDate).getDate()}</span>
      <span class="text-gray-400"
        >{`${getMonthName(pubDate)} ${new Date(pubDate).getFullYear()}`}</span>
    </div>
  </div>
  <div class="flex-1">
    <h4
      class="text-theme-primary mb-2 text-2xl font-semibold hover:underline dark:text-gray-100">
      <a href={`/${slug}`} {title}>{title}</a>
    </h4>
    <p class="line-clamp-2 hyphens-auto text-lg leading-6 dark:text-gray-400">
      {excerpt}
    </p>
  </div>
</div>
