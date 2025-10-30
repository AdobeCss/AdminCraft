/** @type {import('next').NextConfig} */





const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '', // Deixe vazio se não for usar uma porta específica
        pathname: '/**', // Permite qualquer caminho após o domínio
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
      },
    ];
  },
  env: {
    SECRET_KEY:"RM5O8Z3jGBIJFIHSUIASHD2323423++$+#+323423122SDFS????KUSHIUUS77732783GHGS__WERWRERWEREUIQQW78ERY5345I3495832b4llPS2hPWF5FzPxKO7Ugxm6IPPP5lA7c=",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

export default nextConfig;