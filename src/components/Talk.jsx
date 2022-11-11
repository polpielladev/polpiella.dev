export default function Talk({
  title,
  event,
  date,
  slides = null,
  code = null,
  video = null,
}) {
  return (
    <div class="flex gap-1">
      <div class="flex flex-col gap-1">
        <h3 class="m-0">{title}</h3>
        <p class="m-0">{`📍 ${event}`}</p>
        <p class="m-0">{`🗓️ ${date}`}</p>
        <div class="flex flex-wrap gap-2">
          {slides && <a>Slides</a>}
          {code && <a>Code</a>}
          {video && <a>Watch</a>}
        </div>
      </div>
    </div>
  )
}
