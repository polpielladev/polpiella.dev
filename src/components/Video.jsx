export default function Video({ src, controls = true }) {
  return (
    <video
      controls={controls}
      playsInline
      autoPlay
      loop
      className="mx-auto max-h-[800px]"
      src={src}
    />
  )
}
