export default function absoluteURL(path) {
    const baseURL = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:8080";
    return baseURL + path;
}
