import playwright from "playwright-core"
import chromium from "chrome-aws-lambda"

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
        .container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 30px;
            padding: 40px;
        }

        .line {
            position: absolute;
            right: 20px;
            width: 20px;
            height: 100%;
            background-color: #fcd34d;
        }

        h1 {
            font-size: 100px;
            font-weight: 800;
            margin: 0;
        }
        img {
            aspect-ratio: 1;
            object-fit: contain;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            width: 100px;
            height: auto;
        }

        .blog-info {
            display: flex;
            gap: 20px;
        }

        .blog-info > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
        }
        .rounded {
            margin-left: 3px;
            border-radius: 10px;
            background-color: #fbbf24;
            padding: 5px;
        }

        .underlined {
            text-decoration: underline;
            text-decoration-style: wavy;
            text-decoration-color: #fbbf24;
        }

        h2 {
            font-size: 35px;
            font-weight: 800;
            margin: 0;
        }

        p {
            font-size: 20px;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <div class="line"></div>
        <h1>${title}</h1>
        <div class="blog-info">
            <img src="https://polpiella.dev/assets/profile.png" />
            <div>
            <h2>polpiella<span class="rounded">DEV</span></h2>
            <p>
                An <b>iOS development</b> blog by
                <b class="underlined">Pol Piella</b>
            </p>
            </div>
        </div>
        </div>
    </body>
    </html>
    `
}

export default async (req, res) => {
  try {
    await chromium.font(
      "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
    )
    const { query } = req
    const { title } = query
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
    })

    await page.setContent(getHTML(title))
    const data = await page.screenshot({ type: "png" })
    await browser.close()
    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader("Content-Type", "image/png")
    res.end(data)
  } catch (error) {
    console.error(error)
  }
}
