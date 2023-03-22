<script lang="ts">
  let email = ''
  let gdprConsent = false

  function onInput({ currentTarget }: { currentTarget: HTMLInputElement }) {
    email = currentTarget.value
  }

  function onCheckboxInput({
    currentTarget,
  }: {
    currentTarget: HTMLInputElement
  }) {
    gdprConsent = currentTarget.checked
  }

  function isEmailValid(email: string | null) {
    return !!email
      ?.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
</script>

<form
  action="https://sendy.polpiella.dev/subscribe"
  method="POST"
  acceptCharset="utf-8">
  <div class="mb-4 flex flex-col gap-3">
    <input
      type="email"
      name="email"
      id="email"
      class="flex-grow rounded-md bg-slate-200 p-2 dark:bg-slate-700 dark:text-gray-200"
      on:input={onInput}
      placeholder="Your email address..." />
    <div class="hidden">
      <label for="hp">HP</label>
      <br />
      <input type="text" name="hp" id="hp" />
    </div>
    <input type="hidden" name="list" value="uzljZVi1QE9MgNuJYMbe4Q" />
    <input type="hidden" name="subform" value="yes" />
    <button
      type="submit"
      name="submit"
      id="submit"
      disabled={!isEmailValid(email) || !gdprConsent}
      class="rounded-md bg-cyan-400 py-2 px-4 font-semibold text-gray-800 disabled:cursor-not-allowed disabled:opacity-40">
      Subscribe
    </button>
  </div>
  <div class="flex">
    <div class="flex h-5 items-center">
      <input
        type="checkbox"
        name="gdpr"
        id="gdpr"
        on:input={onCheckboxInput}
        class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        required />
    </div>
    <label
      for="gdpr"
      class="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
      <strong class="text-gray-900 dark:text-gray-100">
        No spam, ever!
      </strong>{' '}
      By checking this box you consent to receive emails from hi@polpiella.dev only
      containing issues from the iOS CI Newsletter. Your email will never be shared
      and you can unsubscribe at any time from any of the emails you receive.
    </label>
  </div>
</form>
