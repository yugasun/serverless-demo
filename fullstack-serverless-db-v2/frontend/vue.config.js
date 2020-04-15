module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ENV: require('path').resolve(__dirname, 'env.js'),
      },
    },
    externals: {
      env: 'env'
    },
    plugins: [],
  },
};
