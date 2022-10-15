import satori from 'satori'
import { html } from 'satori-html'
import { Resvg } from '@resvg/resvg-js'
import fetch from 'isomorphic-fetch'

export default async (req, res) => {
  try {
    const { query } = req
    const { title } = query

    const options = {
      background: '#fff',
      fitTo: {
        mode: 'width',
        value: 2400,
      },
    }

    const inter = await fetch('https://polpiella.dev/fonts/inter.ttf').then(
      (res) => res.arrayBuffer()
    )

    const markup = html`<div style="display: flex;">${title}</div>`

    const svg = await satori(markup, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: inter,
          weight: 400,
          style: 'normal',
        },
      ],
    })

    const resvg = new Resvg(svg, options)

    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    res.setHeader('Content-Type', 'image/png')
    res.status(200).send(pngBuffer)
  } catch (error) {
    console.error(error)
  }
}
