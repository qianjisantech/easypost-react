import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const nextConfig = {
  // output: 'export',
  reactStrictMode: false, // 禁用严格模式避免编辑器组件重复渲染
  eslint: {
    ignoreDuringBuilds: true, // 构建时跳过ESLint检查
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时跳过TypeScript检查
  },
  // 生产环境关闭source map以减小体积cle
  productionBrowserSourceMaps: false,

  // 自定义Webpack配置
  webpack: (config, { isServer }) => {
    // 只在客户端构建时添加Monaco编辑器插件
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'json', 'html', 'css'],
          filename: 'static/[name].worker.[contenthash].js',
          globalAPI: true
        })
      )
      config.optimization.minimizer.forEach(plugin => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions = {
            ...plugin.options.terserOptions,
            format: { ascii_only: true } // 强制ASCII字符
          }
        }
      })
      config.module.rules.push({
        test: /\.markdown$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          }
        ]
      });
      // 优化Monaco编辑器打包
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          monaco: {
            test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            name: 'monaco-editor',
            chunks: 'all',
            priority: 20
          }
        }
      }
    }

    return config
  },

  // 代理配置
  async rewrites() {
    if (!process.env.EASYPOST_APP_URL) {
      console.warn('EASYPOST_APP_URL is not set, rewrites will be disabled')
      return []
    }
    if (!process.env.EASYPOST_PROXY_URL) {
      console.warn('EASYPOST_PROXY_URL is not set, rewrites will be disabled')
      return []
    }

    return [
      {
        source: '/app/:path*',
        destination: `${process.env.EASYPOST_APP_URL}/:path*`,
        basePath: false
      },
      {
        source: '/proxy/:path*',
        destination: `${process.env.EASYPOST_PROXY_URL}/:path*`,
        basePath: false
      }
    ]
  },

  // 添加安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  }
}

export default nextConfig