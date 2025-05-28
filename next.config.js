/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://*.mercadopago.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:; connect-src 'self' https://openrouter.ai https://api.stripe.com https://*.mercadopago.com; frame-src 'self' https://js.stripe.com https://pagead2.googlesyndication.com https://*.mercadopago.com;"
          }
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Ignorar o aviso do punycode
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ]
    return config
  },
  // Configurações de otimização e logging
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: true,
  compress: true
}

module.exports = nextConfig 