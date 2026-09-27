import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alma Dung Dưỡng - Mỹ phẩm Vi sinh Hoa Ngân',
    short_name: 'Alma Dungduong',
    description: 'Trải nghiệm mỹ phẩm vi sinh tối giản, khoa học và hiệu quả cho làn da nguyên bản.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#6d8c7d',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
