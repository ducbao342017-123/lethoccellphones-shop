// Netlify Serverless Function - Proxy bảo mật cho GitHub Gist API
// Token chỉ nằm trong Netlify Environment Variables (GITHUB_TOKEN)
// Không bao giờ xuất hiện trong source code

const GIST_ID = "bcc24d3db60536cda7fada08f79b28e7";
const GIST_FILE = "lethoc_store.json";

exports.handler = async (event) => {
  const TOKEN = process.env.GITHUB_TOKEN;
  const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  // Xử lý preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  if (!TOKEN) {
    return {
      statusCode: 500,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "GITHUB_TOKEN not set in Netlify env" })
    };
  }

  const ghHeaders = {
    "Authorization": `token ${TOKEN}`,
    "Accept": "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };

  // GET: Đọc dữ liệu từ Gist
  if (event.httpMethod === "GET") {
    try {
      const res = await fetch(GIST_URL, { headers: ghHeaders });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const gist = await res.json();
      const content = gist.files && gist.files[GIST_FILE]
        ? gist.files[GIST_FILE].content
        : "{}";
      return {
        statusCode: 200,
        headers: { ...cors, "Content-Type": "application/json" },
        body: content
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: { ...cors, "Content-Type": "application/json" },
        body: JSON.stringify({ error: err.message })
      };
    }
  }

  // POST: Ghi dữ liệu lên Gist
  if (event.httpMethod === "POST") {
    try {
      const payload = event.body;
      const res = await fetch(GIST_URL, {
        method: "PATCH",
        headers: ghHeaders,
        body: JSON.stringify({
          files: {
            [GIST_FILE]: { content: payload }
          }
        })
      });
      return {
        statusCode: res.ok ? 200 : 500,
        headers: { ...cors, "Content-Type": "application/json" },
        body: res.ok ? '{"ok":true}' : '{"ok":false,"status":' + res.status + '}'
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: { ...cors, "Content-Type": "application/json" },
        body: JSON.stringify({ error: err.message })
      };
    }
  }

  return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
};
