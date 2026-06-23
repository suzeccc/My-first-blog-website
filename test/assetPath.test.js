import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeAssetPaths, withBasePath } from '../src/utils/assetPath.js';

test('withBasePath prefixes root public assets with the Vite base path', () => {
  assert.equal(
    withBasePath("/img/wallpaper/dynamic/bg.webm", '/My-first-blog-website/'),
    "/My-first-blog-website/img/wallpaper/dynamic/bg.webm",
  );
});

test('withBasePath keeps external and relative paths unchanged', () => {
  assert.equal(withBasePath('https://example.com/a.png', '/My-first-blog-website/'), 'https://example.com/a.png');
  assert.equal(withBasePath('img/local.png', '/My-first-blog-website/'), 'img/local.png');
});

test('normalizeAssetPaths prefixes nested asset config values', () => {
  const config = {
    avatar: '/img/author.jpg',
    localMusic: [{ url: '/music/song.mp3' }],
    wallpaper: { preview: '/img/wallpaper/preview.webm' },
  };

  assert.deepEqual(normalizeAssetPaths(config, '/My-first-blog-website/'), {
    avatar: '/My-first-blog-website/img/author.jpg',
    localMusic: [{ url: '/My-first-blog-website/music/song.mp3' }],
    wallpaper: { preview: '/My-first-blog-website/img/wallpaper/preview.webm' },
  });
});
