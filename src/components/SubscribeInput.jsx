import { useState } from 'react'

const isEmailValid = (email) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default function SubscribeInput() {
  const [email, setEmail] = useState('')
  const [gdprConsent, setGdprConsent] = useState(false)

  return (
    <form
      action="https://sendy.polpiella.dev/subscribe"
      method="POST"
      acceptCharset="utf-8">
      <div className="mb-4 flex gap-3">
        <input
          type="email"
          name="email"
          id="email"
          className="flex-grow rounded-md bg-slate-100 p-2 dark:bg-slate-700"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address..."
        />
        <div className="hidden">
          <label htmlFor="hp">HP</label>
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
          className="rounded-md bg-[#5FF8FE] py-2 px-4 font-semibold text-gray-800 disabled:cursor-not-allowed disabled:opacity-40">
          Subscribe
        </button>
      </div>
      <div class="flex">
        <div class="flex h-5 items-center">
          <input
            type="checkbox"
            name="gdpr"
            id="gdpr"
            onChange={(e) => setGdprConsent(e.target.checked)}
            class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            required
          />
        </div>
        <label htmlFor="gdpr" class="ml-2 text-sm font-medium text-gray-400">
          <strong class="text-gray-900">No spam, ever!</strong> By checking this
          box you consent to receive emails from hi@polpiella.dev only
          containing issues from the iOS CI Newsletter. Your email will never be
          shared and you can unsubscribe at any time from any of the emails you
          receive.
        </label>
      </div>
    </form>
  )
}
