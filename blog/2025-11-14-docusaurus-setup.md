---
slug: primeros-pasos-docusaurus
title: Primeros pasos con Docusaurus
authors: [valdepeace]
tags: [docusaurus, tutorial, web]
---

Docusaurus es una increíble herramienta para crear sitios web estáticos, especialmente orientados a documentación y blogs técnicos. En este post te cuento por qué lo elegí y cómo empezar.

<!--truncate-->

## ¿Por qué Docusaurus?

Después de evaluar varias opciones (Gatsby, Next.js, Hugo), elegí Docusaurus por varias razones:

### ✅ Ventajas

1. **🚀 Rápido de configurar** - En minutos tienes un sitio funcionando
2. **⚛️ Basado en React** - Puedo usar componentes React si los necesito
3. **📝 Markdown nativo** - Escribir contenido es súper simple
4. **🎨 Temas personalizables** - Fácil de adaptar a tu estilo
5. **📱 Responsive por defecto** - Se ve bien en todos los dispositivos
6. **🔍 SEO optimizado** - Configuración automática de meta tags
7. **🌙 Dark mode incluido** - Sin configuración adicional

## Instalación rápida

```bash
npx create-docusaurus@latest my-website classic --typescript
cd my-website
npm start
```

¡Y listo! Tu sitio está corriendo en `http://localhost:3000`

## Estructura del proyecto

```
my-website/
├── blog/                 # Posts del blog
│   └── 2025-11-15-post.md
├── docs/                 # Documentación
│   └── intro.md
├── src/
│   ├── components/       # Componentes React
│   ├── css/             # Estilos personalizados
│   └── pages/           # Páginas custom
├── static/              # Archivos estáticos
└── docusaurus.config.ts # Configuración principal
```

## Configuración básica

El archivo `docusaurus.config.ts` es el corazón de tu sitio:

```typescript
const config: Config = {
  title: 'Tu Nombre',
  tagline: 'Tu tagline aquí',
  url: 'https://tu-sitio.com',
  baseUrl: '/',
  
  themeConfig: {
    navbar: {
      title: 'Mi Sitio',
      items: [
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/about', label: 'Sobre Mí', position: 'left'},
      ],
    },
  },
};
```

## Tips útiles

### 1. Usar Front Matter en posts

```markdown
---
title: Mi Post
authors: [nombre]
tags: [react, tutorial]
---
```

### 2. Truncar contenido en la lista del blog

Usa `<!--truncate-->` para marcar dónde cortar:

```markdown
Resumen del post...

<!--truncate-->

Contenido completo...
```

### 3. Agregar páginas custom

Simplemente crea archivos `.md` o `.tsx` en `src/pages/`:

```
src/pages/about.md → /about
src/pages/projects.md → /projects
```

## Deployment

Docusaurus se puede desplegar fácilmente en:

- **GitHub Pages** - Gratis para repos públicos
- **Vercel** - Deploy automático con cada push
- **Netlify** - Excelente para sitios estáticos
- **AWS S3 + CloudFront** - Más control y escalabilidad

### Deployment en GitHub Pages

```bash
npm run build
npm run deploy
```

## Próximos pasos

En futuros posts cubriré:

- Personalización avanzada de temas
- Agregar componentes React custom
- Integración con servicios externos
- Optimización de rendimiento
- Analytics y SEO avanzado

## Recursos

- [Documentación oficial](https://docusaurus.io)
- [GitHub repo](https://github.com/facebook/docusaurus)
- [Showcase de sitios](https://docusaurus.io/showcase)

---

¿Ya usas Docusaurus? ¿Qué otras herramientas prefieres para sitios personales? ¡Me encantaría conocer tu experiencia!
