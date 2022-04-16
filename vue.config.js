const path = require('path');

function resolve(dir) {
 // __dirname项目根目录的绝对路径
 return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: "@",
        components: "@/components",
        common: "@/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views",
        icons: "@/icons",
      },
    },
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      //配置跨域
      "/api": {
        target: "http://1.15.241.95:8081", //这里后台的地址模拟的;应该填写你们真实的后台接口192.168.1.105   1.15.241.95
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "", //请求的时候使用这个api就可以
        },
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有loader
    // 如果你不这样做，接下来的loader会附加在该规则现有的loader之后
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(resolve( "./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve( "./src/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  },
};
