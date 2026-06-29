// api/status.js - Verifica el estado de un video publicado
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const accessToken = authHeader.split(' ')[1];
  const { publish_id } = req.query;

  if (!publish_id) {
    return res.status(400).json({ error: 'Se requiere publish_id' });
  }

  try {
    const statusRes = await fetch(
      'https://open.tiktokapis.com/v2/post/publish/status/fetch/',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ publish_id }),
      }
    );

    const statusData = await statusRes.json();

    res.status(200).json({
      status: statusData.data?.status || 'UNKNOWN',
      publish_id,
      detail: statusData.data,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
