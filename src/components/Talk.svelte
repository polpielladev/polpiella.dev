<script>
  export let title
  export let event
  export let date
  export let slides = null
  export let code = null
  export let video = null
</script>

<div className="flex gap-1">
  <div className="flex flex-col gap-1">
    <h3 className="m-0">{title}</h3>
    <p className="m-0">{`📍 ${event}`}</p>
    <p className="m-0">{`🗓️ ${date}`}</p>
    <div className="flex flex-wrap gap-2">
      {slides && <a>Slides</a>}
      {code && <a>Code</a>}
      {video && <a>Watch</a>}
    </div>
  </div>
</div>
