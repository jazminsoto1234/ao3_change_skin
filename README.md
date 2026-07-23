# AO3 Skin Generator

Editor visual no-code para crear skins CSS personalizadas en [Archive of Our Own](https://archiveofourown.org). Diseñado para que usuarios sin conocimientos técnicos puedan customizar la apariencia de AO3 sin tocar código.

## Características

- **Templates predefinidos** (Sepia, Modo nocturno, Alto contraste, Modo dislexia, Medieval, Floral) como punto de partida o empezá desde cero
- **Editor visual intuitivo** con controles para colores, tipografía, tamaños, fondos y bordes
- **Preview en tiempo real** que simula el layout real de AO3 con los selectores CSS exactos del sitio
- **Descarga el CSS generado** o guardalo en tu cuenta (auth por magic link) para reutilizarlo después
- **CSS generado en cliente** — todo se procesa localmente, sin servidor propio

## Stack

Next.js, React, Zustand, Tailwind, Supabase. Deploy en Vercel.

## Inicio rápido

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

**Comandos**: `npm run lint`, `npm run test`, `npm run build`

## Límites de scope

- Sin hosting de imágenes propio (URLs externas)
- Sin editor de CSS crudo
- Solo site skins (no work skins)
- Sin extensión de navegador
- Preview simulado (no scraping de AO3)

