const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/missioninsite': {
        target: 'http://localhost:12002',
        changeOrigin: true,
      },
    },
  },
});
