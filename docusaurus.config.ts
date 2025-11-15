import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Andrés Carmona Gil',
  tagline: 'Desarrollador | Creador | Apasionado por la tecnología',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://valdepeace.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/my-website/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'valdepeace', // Usually your GitHub org/user name.
  projectName: 'my-website', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/tu-usuario/my-website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          blogTitle: 'Blog Personal',
          blogDescription: 'Mis pensamientos, ideas y aprendizajes',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Últimos posts',
          blogSidebarCount: 10,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/tu-usuario/my-website/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/profile.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Andrés Carmona',
      logo: {
        alt: 'Andrés Carmona',
        src: 'img/profile.png',
        srcDark: 'img/profile.png',
        style: { borderRadius: '50%' },
        width: 32,
        height: 32,
      },
      items: [
        {to: '/about', label: 'Sobre Mí', position: 'left'},
        {to: '/projects', label: 'Proyectos', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/valdepeace',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/valdepeace',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sitio',
          items: [
            {
              label: 'Sobre Mí',
              to: '/about',
            },
            {
              label: 'Proyectos',
              to: '/projects',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Redes Sociales',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/valdepeace',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/valdepeace',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/valdepeace',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'Documentación',
              to: '/docs/intro',
            },
            {
              label: 'RSS Feed',
              to: '/blog/rss.xml',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andrés Carmona Gil. Hecho con ❤️ usando Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
