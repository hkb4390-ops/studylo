export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const feedUrl = process.env.PLATFORMS_JSON_URL;
  if (!feedUrl) {
    return res.status(500).json({
      error: "PLATFORMS_JSON_URL is not configured in Vercel"
    });
  }

  try {
    const url = new URL(feedUrl);
    if (url.protocol !== "https:") {
      return res.status(400).json({ error: "JSON feed URL must use HTTPS" });
    }
    return res.status(200).json({ url: url.href });
  } catch {
    return res.status(400).json({ error: "Invalid PLATFORMS_JSON_URL" });
  }
}
