# 🚀 Mi Sitio Web Personal con Docusaurus

[![Deploy to GitHub Pages](https://github.com/valdepeace/my-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/valdepeace/my-website/actions/workflows/deploy.yml)

**🌐 Sitio en vivo:** [https://valdepeace.com/](https://valdepeace.com/)

Esta es mi web personal construida con [Docusaurus](https://docusaurus.io/), un generador de sitios estáticos moderno.

## 👨‍💻 Autor

**Andrés Carmona Gil**
- 🐙 GitHub: [@valdepeace](https://github.com/valdepeace)
- 💼 LinkedIn: [valdepeace](https://www.linkedin.com/in/valdepeace)
- 📍 Sevilla, España

## ✨ Características

- 📝 Blog personal con posts en Markdown
- 📄 Páginas personalizadas (Sobre Mí, Proyectos)
- 🎨 Tema personalizable con modo oscuro
- 📱 Completamente responsive
- ⚡ Optimizado para rendimiento y SEO
- 🌍 Soporte multiidioma (ES/EN)

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
```

### Vista Previa de Producción

```bash
npm run serve
```

## ✏️ Personalización Rápida

### 1. Cambia tu información personal
Edita `docusaurus.config.ts` y actualiza:
- `title`: Tu nombre
- `tagline`: Tu descripción
- `url`: Tu URL del sitio
- Enlaces de GitHub y LinkedIn

### 2. Actualiza tu perfil de autor
Edita `blog/authors.yml` con tu información

### 3. Personaliza las páginas
- **Sobre Mí**: `src/pages/about.md`
- **Proyectos**: `src/pages/projects.md`
- **Inicio**: `src/pages/index.tsx`

### 4. Crea posts de blog
Agrega archivos `.md` en la carpeta `blog/` con este formato:

```markdown
---
slug: mi-post
title: Título
authors: [tu-nombre]
tags: [tag1, tag2]
---

Contenido...

<!--truncate-->

Más contenido...
```

## 🚢 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Vercel / Netlify
Simplemente conecta tu repositorio y se desplegará automáticamente.

## 📚 Más Información

Ver [documentación completa de Docusaurus](https://docusaurus.io/docs)

---


**¡Hecho con ❤️!**

