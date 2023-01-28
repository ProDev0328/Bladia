const proxyConfig = require("./proxy.json");
module.exports = {
  outputDir: "dist",
  lintOnSave: true,
  publicPath: "./",
  devServer: {
    ...proxyConfig,
  },
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      // ...other Workbox options...
    },
  },
};