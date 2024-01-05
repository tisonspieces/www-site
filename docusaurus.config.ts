import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, PluginConfig} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'tisonkun.com',
    url: 'https://www.tisonkun.com/',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: 'img/favicon.ico',

    presets: [
        [
            'classic',
            {
                docs: false,
                blog: {
                    path: 'blog',
                    routeBasePath: 'blog',
                    blogSidebarTitle: 'All posts',
                    blogSidebarCount: 'ALL',
                    showReadingTime: true,
                    editUrl: 'https://github.com/tisonspieces/www-site/tree/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/social-card.png',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true
        },
        navbar: {
            logo: {alt: 'Logo', src: 'img/logo.svg'},
            items: [
                {
                    type: 'dropdown',
                    label: 'Resources',
                    position: 'right',
                    items: [
                        {type: 'doc', docId: 'about', docsPluginId: 'asfcookbook', label: 'ASF Cookbook'},
                    ],
                },
                {
                    href: 'https://github.com/tisonspieces/www-site',
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub repository',
                },
                {type: 'search', position: 'right'},
            ],
        },
        footer: {
            style: 'dark',
            copyright: `Copyright © 2024 tison &lt;wander4096@gmail.com&gt;. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,

    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'asfcookbook',
                path: 'asfcookbook',
                routeBasePath: 'asfcookbook',
                sidebarPath: './sidebars/asfcookbook.ts',
            },
        ],
        [require.resolve("docusaurus-plugin-image-zoom"), {}],
        async function tailwindcss(context, options) {
            return {
                name: "tailwindcss",
                configurePostCss(options) {
                    options.plugins.push(require("tailwindcss"));
                    options.plugins.push(require("autoprefixer"));
                    return options;
                },
            };
        },
    ] satisfies PluginConfig[],

    themes: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                hashed: true,
                indexDocs: true,
                indexPages: true,
                docsDir: [
                    'asfcookbook',
                ],
                docsRouteBasePath: [
                    'asfcookbook',
                ],
                docsPluginIdForPreferredVersion: 'asfcookbook',
                language: ["en"],
            }
        ],
    ] satisfies PluginConfig[],
};

export default config;
