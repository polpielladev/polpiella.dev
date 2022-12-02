import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'
import fetch from 'isomorphic-fetch'

export default async (req, res) => {
  const { query } = req
  
  const { title } = query

  const opts = {
    background: '#fff',
    fitTo: {
      mode: 'width',
      value: 2400
    }
  }

  const inter = await fetch('https://polpiella.dev/fonts/inter.ttf').then((res) =>
    res.arrayBuffer()
  )

  const markup = html`<html>
  <body style="margin: 0; padding: 0">
      <div style="display: flex; position: relative; flex-direction: column; width: 100vw; height: 100vh;">
          <img
            src="https://polpiella.dev/assets/og-background.png"
            style="position:absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center;"
          />
          <div style="width: 100%; height: 100%; display: flex; align-items: center; margin-left: 150px;">
              <h1 style="width: 100%; color: #FFFBFB; max-width: 1000px; font-size: 85px; line-height: 102.87px; font-weight: 500;">
                  ${title}
              </h1>
          </div>
          <div style="display: flex; position: absolute; bottom: 20px; right: 40px; align-items: center;">
              <img
                  src="https://polpiella.dev/assets/profile.jpg"
                  style="width: 100px; height: 100px; object-fit: cover; border-radius: 100px; margin-right: 16px;"
              />
              <div style="color: #FFFBFB;">
                  <p style="font-size: 20px; font-weight: bold; margin: 0; margin-bottom: 8px;">Pol Piella Abadia</p>
                  <p style="color: #e5e7eb; margin: 0;">@polpielladev</p>
              </div>
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
        weight: 400,
        style: 'normal'
      }
    ]
  })

  const resvg = new Resvg(svg, opts)

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  res.setHeader('Content-Type', 'image/png')
  res.status(200).send(pngBuffer)
}