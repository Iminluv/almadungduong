import { MetadataRoute } from 'next';

const BASE_URL = 'https://almadungduong.vn';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/tai-khoan',
          '/thanh-toan',
          '/ket-qua',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
