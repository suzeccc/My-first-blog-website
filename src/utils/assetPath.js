const PUBLIC_ASSET_PREFIXES = ['/img/', '/music/', '/favicon.ico'];

function getDefaultBasePath() {
  return import.meta.env?.BASE_URL || '/';
}

function isPublicAssetPath(path) {
  return PUBLIC_ASSET_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix));
}

export function withBasePath(path, basePath = getDefaultBasePath()) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
    return path;
  }

  if (!isPublicAssetPath(path)) {
    return path;
  }

  const base = basePath === '/' ? '' : basePath.replace(/\/$/, '');
  return `${base}${path}`;
}

export function normalizeAssetPaths(value, basePath = getDefaultBasePath()) {
  if (typeof value === 'string') {
    return withBasePath(value, basePath);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeAssetPaths(item, basePath));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeAssetPaths(item, basePath)]),
    );
  }

  return value;
}
