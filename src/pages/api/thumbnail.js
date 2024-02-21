import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'
import fetch from 'isomorphic-fetch'

export const prerender = false

export async function GET({ url }) {
  const { searchParams } = url
  const title = searchParams.get('title')

  const opts = {
    background: '#fff',
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  }

  const inter = await fetch(
    'https://polpiella.dev/fonts/Satoshi-Black.ttf'
  ).then((res) => res.arrayBuffer())

  const satoshi = await fetch(
    'https://polpiella.dev/fonts/Satoshi-Medium.ttf'
  ).then((res) => res.arrayBuffer())

  const markup = html`<html>
    <body style="margin: 0; padding: 0">
      <div
        style="display: flex; position: relative; flex-direction: column; width: 100vw; height: 100vh; justify-content: space-between;">
        <img
          src="https://polpiella.dev/assets/og-background-gradient.png"
          style="position:absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center;" />
        <div
          style="width: 100%; height: 100%; display: flex; align-items: flex-start; flex-direction: column; padding: 40px 70px; position: relative;">
          <img
            src="https://polpiella.dev/assets/logo.png"
            style="width: 90px; height: 60px;" />
          <h1 style="width: 100%; color: #FFFBFB; font-size: 65px;">
            ${title}
          </h1>
          <p
            style="position: absolute; width: 100%; color: #FFFBFB95; font-size: 20px; padding: 40px 70px; bottom: 0; font-weight: 400;">
            polpiella.dev · A blog about Swift and Apple app development ·
            @polpielladev
          </p>
        </div>
      </div>
    </body>
  </html>`

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: inter,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: satoshi,
        weight: 400,
        style: 'normal',
      },
    ],
  })

  const resvg = new Resvg(svg, opts)

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer, { headers: { 'Content-Type': 'image/png' } })
}
