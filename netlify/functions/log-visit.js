import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body || "{}");

  const ip =
    event.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

  const userAgent = event.headers["user-agent"] || "unknown";

  await supabase.from("visitor_logs").insert([
    {
      ip,
      page_visited: body.pageVisited,
      user_agent: userAgent
    }
  ]);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
