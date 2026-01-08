export default {
  async fetch(request, env, ctx) {
    const RSS_URL = "https://note.com/yuit_note/rss";

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle Preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    // Only allow /note-latest endpoint
    if (url.pathname !== "/note-latest") {
      return new Response(JSON.stringify({ error: "Not Found", items: [] }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const response = await fetch(RSS_URL, {
        headers: { "User-Agent": "Cloudflare-Workers-RSS-Proxy" },
        cf: { cacheTtl: 300, cacheEverything: true },
      });

      if (!response.ok) {
        throw new Error(`RSS fetch failed: ${response.status}`);
      }

      const xmlText = await response.text();
      const items = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;

      // Extract up to 4 items
      while ((match = itemRegex.exec(xmlText)) !== null && items.length < 4) {
        const content = match[1];

        // Helper to extract basic tags
        const title = extractTag(content, "title");
        const link = extractTag(content, "link");
        const pubDate = extractTag(content, "pubDate");

        // Helper to extract thumbnail (handle both tag content and attributes)
        let thumbnail = extractTag(content, "media:thumbnail");
        if (!thumbnail) {
          // Fallback to extracting url attribute from <media:thumbnail url="..." />
          thumbnail = extractAttribute(content, "media:thumbnail", "url");
        }

        if (title && link && pubDate) {
          items.push({
            title,
            link,
            pubDate,
            thumbnail: thumbnail || null,
          });
        }
      }

      // If no items found, verify if it's an error or just empty
      if (items.length === 0) {
        return new Response(JSON.stringify({ error: "No items parsed", items: [] }), {
          status: 200, // Return 200 to allow frontend to handle "empty" gracefully
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ items }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=300", // Cache for 5 mins
        },
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message, items: [] }), {
        status: 200, // Return 200 with empty items so frontend doesn't crash
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};

/** Helper: Extract content between <tag>...</tag> */
function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(regex);
  if (!match) return null;
  let val = match[1].trim();
  // Remove CDATA if present
  if (val.startsWith("<![CDATA[")) {
    val = val.replace(/^<!\[CDATA\[|\]\]>$/g, "");
  }
  return val;
}

/** Helper: Extract attribute value from <tag attr="..." /> */
function extractAttribute(xml, tagName, attrName) {
  // Matches <tagName ... attrName="value" ... >
  const regex = new RegExp(`<${tagName}\\s+[^>]*${attrName}=["']([^"']*)["']`, "i");
  const match = xml.match(regex);
  return match ? match[1] : null;
}