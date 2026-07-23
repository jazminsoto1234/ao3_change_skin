<div align="center">

# 🎨 AO3 Skin Generator

**Cambiale la cara a Archive of Our Own sin escribir una línea de CSS.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 💡 La idea

AO3 tiene `Settings > Skins`: un campo de texto donde pegás CSS y transformás el sitio entero. Brutal si sabés CSS, inútil si no. Acá lo resolvemos con controles visuales — vos tocás sliders y color pickers, la app te devuelve el CSS listo para pegar.

## ✨ Qué tiene hoy

- 🖌️ **Seis templates de arranque** — Sepia, Nocturno, Alto contraste, Dislexia, Medieval y Floral, cada uno con su propia paleta y tipografía. También podés arrancar en blanco.
- 🎚️ **Modo básico y avanzado** — el básico cubre colores, tipografía y tamaños en minutos; el avanzado suma imagen de fondo, Google Fonts y bordes decorativos.
- 👀 **Preview en vivo** — el cambio se ve al instante sobre un layout que usa los selectores CSS reales de AO3, no una aproximación.
- 🔗 **Guardado con magic link** — creás cuenta sin contraseña para guardar tus skins, o simplemente descargás el CSS si no querés registrarte.
- 🔒 **Todo client-side** — el CSS se genera en tu navegador, nada pasa por un servidor propio.

## 🛠️ Stack

Next.js · React · Zustand · Tailwind · Supabase — deploy en Vercel

## 🚀 Poner esto a andar

```bash
cd frontend
npm install
```

Creá `frontend/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) 🎉

Otros comandos: `npm run lint` · `npm run test` · `npm run build`

## 🚧 Todavía no hace esto

- 🖼️ **No aloja imágenes** — los fondos van por URL externa (Imgur, Tumblr CDN, lo que sea).
- ✍️ **No hay editor de CSS crudo** — el CSS es una salida, no algo que edites a mano acá.
- 📄 **Solo site skins** — nada de work skins ni wildcards condicionales por ahora.
- 🧩 **No es extensión de navegador** — el flujo es generar, copiar y pegar en AO3.
- 🎭 **El preview es una simulación** — no lee tu sesión real ni scrapea el sitio.
