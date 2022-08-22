import playwright from 'playwright-core'
import chromium from 'chrome-aws-lambda'

function getHTML(title) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        .container > p {
            color: #a1a1aa;
        }

        .container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
            padding: 40px;
            text-align: center;
        }

        h1 {
            font-size: 48px;
            font-weight: 800;
            margin: 0;
            line-height: 1;
            max-width: 680px;
        }

        img {
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            width: 45px;
        }

        .blog-info {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            width: 100%;
            position: absolute;
            align-items: center;
            bottom: 20px;
            padding: 0 30px;
        }

        .rounded {
            margin-left: 3px;
            border-radius: 6px;
            background-color: #fbbf24;
            padding: 3px;
        }

        h2 {
            font-size: 20px;
            font-weight: 800;
            margin: 0;
        }

        p {
            font-size: 20px;
        }
        .author {
            display: flex;
            align-items: center;
            font-weight: bold;
            gap: 10px
        }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>${title}</h1>
            <p>https://polpiella.dev</p>
            <div class="blog-info">
                <div class="author">
                <img src="https://polpiella.dev/assets/profile.png" />
                <p>Pol Piella Abadia</p>
                </div>
                <h2>polpiella<span class="rounded">DEV</span></h2>
            </div>
        </div>
        </body>
        </html>
    `
}

export default async (req, res) => {
  try {
    await chromium.font(
      'https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf'
    )
    const { query } = req
    const { title } = query
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    const page = await browser.newPage({
      viewport: { width: 850, height: 630 },
    })

    await page.setContent(getHTML(title))
    const data = await page.screenshot({ type: 'png' })
    await browser.close()
    res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
    res.setHeader('Content-Type', 'image/png')
    res.end(data)
  } catch (error) {
    console.error(error)
  }
}
