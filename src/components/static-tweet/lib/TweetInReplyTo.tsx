import type { FC } from 'react'
import type { Tweet } from '../types'
import { getInReplyToUrl } from '../utils'
// import s from './tweet-in-reply-to.module.css'

export const TweetInReplyTo: FC<{ tweet: Tweet }> = ({ tweet }) => (
  <a href={getInReplyToUrl(tweet)} target="_blank" rel="noopener noreferrer">
    Replying to @{tweet.in_reply_to_screen_name}
  </a>
)
