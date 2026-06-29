// api/upload.js - Sube un video a TikTok
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const { videoUrl, title, scheduleTime, privacyLevel } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Se requiere videoUrl' });
    }

    // Paso 1: Iniciar el upload
    const initBody = {
      post_info: {
        title: title || 'Short generado con ShortsAI Studio',
        privacy_level: privacyLevel || 'SELF_ONLY', // SELF_ONLY para pruebas, PUBLIC_TO_EVERYONE en producción
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source: 'PULL_FROM_URL',
        video_url: videoUrl,
      },
    };

    // Si viene fecha de programación, la añadimos
    if (scheduleTime) {
      const scheduleTimestamp = Math.floor(new Date(scheduleTime).getTime() / 1000);
      initBody.post_info.auto_add_music = false;
      initBody.post_info.schedule_time = scheduleTimestamp;
    }

    const uploadRes = await fetch(
      'https://open.tiktokapis.com/v2/post/publish/video/init/',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(initBody),
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadData.error?.code && uploadData.error.code !== 'ok') {
      return res.status(400).json({
        error: uploadData.error.message || 'Error al iniciar upload',
        code: uploadData.error.code,
      });
    }

    res.status(200).json({
      success: true,
      publish_id: uploadData.data?.publish_id,
      message: scheduleTime
        ? `Video programado para ${scheduleTime}`
        : 'Video enviado a TikTok correctamente',
    });

  } catch (err) {
    res.status(500).json({ error: 'Error interno: ' + err.message });
  }
}
