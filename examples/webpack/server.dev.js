/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.dev')

const ip = '0.0.0.0'
const port = process.env.PORT || 3000
const app = express()
const compiler = webpack(config)

app.set('view engine', 'ejs')

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) =>
  res.render('index', {
    appBundle: 'app.en.js',
  })
)

app.get('/cn', (req, res) =>
  res.render('index', {
    appBundle: 'app.cn.js',
  })
)
app.get('/cz', (req, res) =>
  res.render('index', {
    appBundle: 'app.cz.js',
  })
)
app.get('/pt', (req, res) =>
  res.render('index', {
    appBundle: 'app.pt.js',
  })
)
app.get('/es', (req, res) =>
  res.render('index', {
    appBundle: 'app.es.js',
  })
)
app.listen(port, ip, () => console.info(`Example app listening on port ${port}!`))
