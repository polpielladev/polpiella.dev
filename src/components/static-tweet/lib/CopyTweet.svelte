<script lang="ts">
  import type { Tweet } from '../types'
  import { getTweetUrl } from '../utils'

  let copied = false
  let copyAllText = false

  export let tweet: Tweet

  const handleCopy = () => {
    navigator.clipboard.writeText(getTweetUrl(tweet))
    copied = true

    const timeout = setTimeout(() => {
      copied = false
      copyAllText = true

      clearTimeout(timeout)
    }, 6000)
  }
</script>

<button type="button" class="copy" aria-label="Copy link" on:click={handleCopy}>
  <div class="copyIconWrapper">
    {#if copied}
      <svg viewBox="0 0 24 24" class="copyIcon" aria-hidden="true">
        <g>
          <path
            d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z" />
        </g>
      </svg>
    {:else}
      <svg viewBox="0 0 24 24" class="copyIcon" aria-hidden="true">
        <g>
          <path
            d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z" />
        </g>
      </svg>
    {/if}
  </div>
  <span class="copyText">
    {copied ? 'Copied!' : copyAllText ? 'Copy link to Tweet' : 'Copy link'}
  </span>
</button>

<style>
  .copy {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    margin-right: 1.25rem;
  }

  .copy:hover {
    background-color: rgba(0, 0, 0, 0);
  }

  .copyIconWrapper {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -0.25rem;
    border-radius: 9999px;
  }

  .copyIcon {
    height: 1.25em;
    fill: currentColor;
    user-select: none;
  }

  .copyText {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1rem;
    margin-left: 0.25rem;
  }

  .copy {
    font: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }
  .copy:hover > .copyIconWrapper {
    background-color: var(--tweet-color-green-primary-hover);
  }
  .copy:hover .copyIcon {
    color: var(--tweet-color-green-primary);
  }
  .copy:hover > .copyText {
    color: var(--tweet-color-green-primary);
    text-decoration-line: underline;
  }
</style>
