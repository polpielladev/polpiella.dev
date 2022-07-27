export default function Video({ src }) {
  return (
    <video controls playsInline className="mx-auto max-h-[800px]" src={src} />
  )
}
