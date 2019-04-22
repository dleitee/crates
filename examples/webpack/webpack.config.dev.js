const path = require('path')

const webpack = require('webpack')
const I18nPlugin = require('i18n-webpack-plugin')

const cz = require('./translations/translation.cz.json')
const es = require('./translations/translation.es.json')
const pt = require('./translations/translation.pt.json')
const cn = require('./translations/translation.cn.json')

const languages = {
  en: null,
  cn,
  cz,
  es,
  pt,
}

module.exports = Object.keys(languages).map(function(language) {
  return {
    mode: 'development',
    entry: {
      app: ['webpack-hot-middleware/client', './src/index.js'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].' + language + '.js',
    },
    plugins: [new I18nPlugin(languages[language]), new webpack.HotModuleReplacementPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
      ],
    },
  }
})
