const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

// const path = require('path');

module.exports = defineConfig({
  plugins: [
    new webpack.DefinePlugin({
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    })
  ],
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'? '/':'/',
}



// module.exports = {
//   outputDir: path.resolve(__dirname, '../backend/public'),
//   devServer: {
//     proxy: {
//       '/': {
//         target: 'http://localhost:8081'
//       }
//     }
//   }
// }


// chainWebpack: (config) => {
//   config.plugin('define').tap((definitions) => {
//     Object.assign(definitions[0], {
//       __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
//     })
//     return definitions
//   })
// }


