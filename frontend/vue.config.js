const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = {
  chainWebpack: config => {
    // Evita prefetch/preload automatici per i chunk async
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  },

  configureWebpack: {
    plugins: [
      // Analizzatore bundle
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 8888,
      //   openAnalyzer: true,
      // }),

      // Ignora i locali di moment.js
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Chunk unico per tutti i vendor: evita creare npm.xxx per ogni package
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-vendors',    // NOME FISSO: tutto in un unico vendor chunk
            chunks: 'all',
            priority: 10,
            enforce: true,
          },

          // Chunk dedicato SOLO per exceljs
          exceljs: {
            test: /[\\/]node_modules[\\/]exceljs[\\/]/,
            name: 'chunk-exceljs',
            // use 'async' if you want it strictly loaded only when import() is executed
            // if you prefer webpack to consider it also for initial chunks set 'all'
            chunks: 'async',
            priority: 20,
            enforce: true,
          },

          // (opzionale) Altre regole dedicate se in futuro vuoi isolare pacchetti pesanti:
          // xlsx, moment, ecc.
        },
      },
    },
  },
};
