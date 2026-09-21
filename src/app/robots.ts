import { MetadataRoute } from 'next';

const BASE_URL = 'https://almadungduong.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/tai-khoan/',
          '/tai-khoan',
          '/thanh-toan/',
          '/thanh-toan',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
