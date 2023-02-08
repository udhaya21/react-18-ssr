import * as React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/components/App';
import axios from 'axios';

let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
};

module.exports = async function render(url, res) {
  res.socket.on('error', (error) => {
    console.error('Fatal', error);
  });
  let didError = false;
  const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const stream = renderToPipeableStream(
    <App assets={assets} posts={data.data} />,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    }
  );
  setTimeout(() => stream.abort(), 100000);
};
