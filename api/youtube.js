export default async function handler(req, res) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return res.status(500).json({
        error: "Faltam variáveis de ambiente"
      });
    }

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const channel = data.items?.[0];

    return res.status(200).json({
      title: channel.snippet.title,
      subscribers: channel.statistics.subscriberCount,
      views: channel.statistics.viewCount,
      videos: channel.statistics.videoCount
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar YouTube",
      details: error.message
    });
  }
}
