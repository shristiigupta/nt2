exports.handler = async (event) => {
  try {
    const videoId = event.queryStringParameters?.videoId;

    if (!videoId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "videoId is required",
        }),
      };
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "YouTube API key is not configured",
        }),
      };
    }

    const url =
      `https://www.googleapis.com/youtube/v3/commentThreads` +
      `?part=snippet` +
      `&videoId=${encodeURIComponent(videoId)}` +
      `&maxResults=5` +
      `&order=relevance` +
      `&textFormat=plainText` +
      `&key=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      console.error("YouTube API error:", data);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Failed to fetch YouTube comments",
          details: data,
        }),
      };
    }

    const comments = (data.items || []).map((item) => {
      const snippet = item.snippet.topLevelComment.snippet;

      return {
        author: snippet.authorDisplayName,
        authorImage: snippet.authorProfileImageUrl,
        text: snippet.textDisplay,
        likes: snippet.likeCount,
        publishedAt: snippet.publishedAt,
      };
    });

    return {
      statusCode: 200,

      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },

      body: JSON.stringify({
        videoId,
        comments,
      }),
    };
  } catch (error) {
    console.error("Server error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
      }),
    };
  }
};