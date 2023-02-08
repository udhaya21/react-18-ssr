'use strict';

const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [['react-app', { runtime: 'automatic' }]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');
const htmlRenderer = require('./htmlRender');

const PORT = process.env.PORT || 4000;
const app = express();

// app.use((req, res, next) => {
//   if (req.url.endsWith('.js')) {
//     setTimeout(next, 1000);
//   } else {
//     next();
//   }
// });

app.get(
  '/',
  handleErrors(async function (req, res) {
    //await waitForWebpack();
    htmlRenderer(req.url, res);
  })
);
app.use(express.static('build'));
app.use(express.static('public'));

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })
  .on('error', function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const isPipe = (portOrPipe) => Number.isNaN(portOrPipe);
    const bind = isPipe(PORT) ? 'Pipe ' + PORT : 'Port ' + PORT;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (x) {
      next(x);
    }
  };
}

async function waitForWebpack() {
  while (true) {
    try {
      readFileSync(path.resolve(__dirname, '../build/main.js'));
      return;
    } catch (err) {
      console.log(
        'Could not find webpack build output. Will retry in a second...'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
