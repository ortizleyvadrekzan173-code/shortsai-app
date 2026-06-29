// api/callback.js - TikTok redirige aquí tras el login
export default async function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    return res.redirect(`/?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return res.status(400).json({ error: 'No code received from TikTok' });
  }

  try {
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.redirect(`/?error=${encodeURIComponent(tokenData.error_description)}`);
    }

    const { access_token, refresh_token, expires_in, open_id } = tokenData;

    // Redirige al frontend con el token (en producción usa una cookie segura o DB)
    const params = new URLSearchParams({
      access_token,
      refresh_token,
      expires_in,
      open_id,
      connected: 'true'
    });

    res.redirect(`/?${params.toString()}`);

  } catch (err) {
    res.redirect(`/?error=${encodeURIComponent('Error al obtener token: ' + err.message)}`);
  }
}
