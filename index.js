var reg = /<!--\s*bundle\s*-->/;
var asyncScript = false;

function htmlWebpackInjectBundlePlugin(options) {
  if (options && options.reg) {
    reg = options.reg;
  }
  if (options && options.async) asyncScript = true;
}

htmlWebpackInjectBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      if (!reg.test(htmlPluginData.html)) {
        console.log('no inject point found');
        callback(null, htmlPluginData);
      }
      var assets;
      try {
        assets = htmlPluginData.assets.js.reduce((pre, cur, idx) => {
          if (cur) return pre += '<script ' + (asyncScript ? 'async' : '') + ' src="' + cur + '"></script>';
          return pre;
        }, '');
      } catch (e) {
        console.log('no js found');
      }
      if (assets) {
        htmlPluginData.html = htmlPluginData.html.replace(reg, assets);
        htmlPluginData.assets.js = [];
      }
      callback(null, htmlPluginData);
    });
  });

};

module.exports = htmlWebpackInjectBundlePlugin;