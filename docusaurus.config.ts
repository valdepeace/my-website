import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Andrés Carmona Gil',
  tagline: 'Developer | Creator | Passionate about technology',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://valdepeace.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'valdepeace', // Usually your GitHub org/user name.
  projectName: 'my-website', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          blogTitle: 'Personal Blog',
          blogDescription: 'My thoughts, ideas and learnings',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Latest posts',
          blogSidebarCount: 10,
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
        {to: '/about', label: 'About Me', position: 'left'},
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
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
          title: 'Site',
          items: [
            {
              label: 'About Me',
              to: '/about',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Social Networks',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/valdepeace',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/valdepeace',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andrés Carmona Gil. Made with ❤️ using Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
