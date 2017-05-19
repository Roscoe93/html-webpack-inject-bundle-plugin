# HTML webpect inject bundle plugin
扩展了HTML webpack plugin的功能，能够把JS bundle替换HTML文档中指定的任意位置。
## 基本用法
在引用HTML webpack plugin的基础之上，增加如下配置
```javascript
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    }),
    new HTMLWebpectInjectBundlePlugin(options)
  ]
}
```
## 配置项
- `options.reg` 替换的正则表达式，默认为 ` /<!--\s*bundle\s*-->/`