import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const RSS_URL = 'https://note.com/yuit_note/rss';

  try {
    const upstream = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'YUIT-Site/1.0 (RSS Fetcher)',
      },
    });

    if (!upstream.ok) {
      return res.status(upstream.status).send(upstream.statusText);
    }

    const xml = await upstream.text();

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    return res.status(200).send(xml);
  } catch (error) {
    return res.status(500).send('Failed to fetch RSS');
  }
}
