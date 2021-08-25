import playwright from "playwright-core";
import chromium from "chrome-aws-lambda";

function getCSS() {
    return `
    *,
    :after,
    :before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size: 50px;
        max-width: 800px;
    }

    p {
        font-size: 20px;
        color: darkgrey;
    }

    body {
        width: 100vw;
        height: 100vh;
        background-color: #282c35;
        color: white;
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 20px;
    }

    .container > *:not(:last-child) {
        margin-bottom: 30px;
    }

    img {
        height: auto;
        width: auto;
        height: 150px;
        object-fit: cover;
    }
    `;
}

function getHTML(title, description) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Document</title>
            <style>${getCSS()}</style>
        </head>
        <body>
            <div class="container">
                <img src="https://www.polpiella.dev/assets/logo.svg" />
                <h1>${title}</h1>
                <p>${description}</p>
            </div>
        </body>
    </html>
    `;
}

export default async (req, res) => {
    try {
        await chromium.font(
            "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
        );
        const { query } = req;
        const { title, description } = query;
        const browser = await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage({
            viewport: { width: 1200, height: 630 },
        });

        await page.setContent(getHTML(title, description));
        const data = await page.screenshot({ type: "png" });
        await browser.close();
        res.setHeader(
            "Cache-Control",
            "s-maxage=31536000, stale-while-revalidate"
        );
        res.setHeader("Content-Type", "image/png");
        res.end(data);
    } catch (error) {
        console.error(error);
    }
};
