<script lang="ts">
  export let title: string
  export let body: string
</script>

<div
  class="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
  <h1
    class="mb-4 font-title text-4xl leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
    {title}
  </h1>
  <p
    class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
    {body}
  </p>
  <form class="mx-auto w-full max-w-md">
    <label
      for="default-email"
      class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Email sign-up</label>
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg
          class="h-4 w-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16">
          <path
            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
          <path
            d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
        </svg>
      </div>
      <input
        type="email"
        id="default-email"
        class="block w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-sm text-gray-900 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
        placeholder="Enter your email here..."
        required />
      <button
        type="submit"
        class="absolute bottom-2.5 right-2.5 rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        >Sign up</button>
    </div>
  </form>
</div>
<div
  class="absolute left-0 top-0 -z-50 h-[450px] w-full bg-gradient-to-b from-violet-200 to-transparent dark:from-violet-900" />
