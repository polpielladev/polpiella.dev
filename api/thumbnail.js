import playwright from "playwright-core";
import chromium from "chrome-aws-lambda";

export default async (req, res) => {
    try {
        await chromium.font(
            "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
        );
        const { query } = req;
        const { title } = query;
        const browser = await playwright.chromium.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage({
            viewport: { width: 1200, height: 630 },
        });

        await page.setContent(`<h1>${title}</h1>`);
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
