<script lang="ts">
  import type { Event } from './Event'

  export let event: Event

  const { title, company, image, description, startDate, endDate } = event
</script>

<li class="mb-10 ml-5">
  <span
    class="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900">
    <img class="h-5 w-5" src={image} alt={`${company} Logo`} />
  </span>
  <h3
    class="m-0 mb-2 flex items-center font-semibold text-gray-900 dark:text-white">
    {title}
  </h3>
  <h4 class="m-0 mb-2 leading-none">{company}</h4>
  <time
    class="mb-4 block text-xs font-semibold leading-none text-gray-400 dark:text-gray-300">
    {startDate} - {endDate ?? 'Present'}
  </time>

  <p class="m-0 text-base font-normal text-gray-500 dark:text-gray-400">
    {description}
  </p>
</li>
