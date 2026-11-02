import { MetadataRoute } from 'next';
import { DEFAULT_DOMAIN } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/studio', '/docs', '/en/docs', '/login', '/en/login', '/api'],
        },
        sitemap: `${DEFAULT_DOMAIN}/sitemap.xml`,
    };
}
