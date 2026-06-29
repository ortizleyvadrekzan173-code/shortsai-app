// api/auth.js - Inicia el login con TikTok
export default function handler(req, res) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.REDIRECT_URI;

  const scope = 'user.info.basic,video.upload,video.publish';
  const csrfState = Math.random().toString(36).substring(2);

  res.setHeader('Set-Cookie', `csrfState=${csrfState}; HttpOnly; Secure; SameSite=Lax; Path=/`);

  const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
  url.searchParams.set('client_key', clientKey);
  url.searchParams.set('scope', scope);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('state', csrfState);

  res.redirect(url.toString());
}
