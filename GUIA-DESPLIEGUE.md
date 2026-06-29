# 🚀 GUÍA DE DESPLIEGUE — ShortsAI Studio con TikTok

## LO QUE NECESITAS ANTES DE EMPEZAR
- Tu Client Key de TikTok (lo ves en developers.tiktok.com)
- Tu Client Secret de TikTok
- Una cuenta en github.com (gratis)
- Una cuenta en vercel.com (gratis, entra con Google)

---

## PASO 1 — Sube el proyecto a GitHub

1. Ve a github.com → "New repository"
2. Nómbralo: `shortsai-studio`
3. Hazlo **Private**
4. Sube todos los archivos de esta carpeta:
   - /api/auth.js
   - /api/callback.js
   - /api/upload.js
   - /api/status.js
   - /public/index.html
   - /vercel.json
   - /package.json

---

## PASO 2 — Despliega en Vercel

1. Ve a vercel.com → "Add New Project"
2. Selecciona tu repositorio `shortsai-studio`
3. Clic en **Deploy** (sin cambiar nada más)
4. Vercel te dará una URL como: `https://shortsai-studio-abc123.vercel.app`
   → **GUARDA ESTA URL**, la necesitas en el siguiente paso.

---

## PASO 3 — Configura las variables de entorno en Vercel

En Vercel → tu proyecto → Settings → Environment Variables:

| Nombre | Valor |
|--------|-------|
| `TIKTOK_CLIENT_KEY` | Tu Client Key de TikTok |
| `TIKTOK_CLIENT_SECRET` | Tu Client Secret de TikTok |
| `REDIRECT_URI` | `https://TU-URL.vercel.app/api/callback` |

Clic en **Save** y luego en **Redeploy**.

---

## PASO 4 — Configura el Redirect URI en TikTok

1. Ve a developers.tiktok.com → tu App
2. En "Login Kit" → "Web" → "Redirect URI"
3. Añade: `https://TU-URL.vercel.app/api/callback`
4. Guarda los cambios

---

## PASO 5 — Usa la app

1. Abre `https://TU-URL.vercel.app`
2. Clic en **"Conectar TikTok"**
3. TikTok te pedirá autorizar tu cuenta → acepta
4. ¡Listo! Ya puedes generar guiones y publicar Shorts directamente.

---

## NOTAS IMPORTANTES

### Sobre los videos
Para publicar en TikTok, el video necesita ser una URL pública accesible en internet.
Opciones gratuitas para hospedar el video:
- Subir a Google Drive y copiar el enlace directo
- Usar Cloudinary (gratis hasta 25GB)
- Usar cualquier CDN o hosting de video

### Permisos necesarios en tu App de TikTok
Asegúrate de tener activados en tu App:
- ✅ user.info.basic
- ✅ video.upload  
- ✅ video.publish

### YouTube Shorts
La integración con YouTube requiere aprobación de Google. 
El proceso es similar: necesitas activar YouTube Data API v3 en Google Cloud Console.
