const LANGS = [
   // { key: "en", name: "English" },
    { key: "fr", name: "Français" },
    // { key: "de", name: "Deutschland" },
    // { key: "nl", name: "Netherlandian" },
    // { key: "es", name: "Español" },
    // { key: "it", name: "Italian" },
];
const paths = [{
        path: '',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 1,
        changefreq: 'weekly'
    },
    {
        path: '/ferry',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/about',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/connect',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/register',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/settings',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/offers',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/help',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/transporter',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/blog',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/faq',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/mycompany',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/journeys',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/ports',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
    {
        path: '/compagnies',
        lastmod: new Date().toISOString().slice(0, 10),
        priority: 0.8,
        changefreq: 'weekly'
    },
];

exports.paths = paths;
exports.LANGS = LANGS;