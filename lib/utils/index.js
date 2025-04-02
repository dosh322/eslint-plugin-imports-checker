const path = require('path');

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../')
};

function getNormalizedCurrentFilePath(filepath) {
      const normalizedPath = path.toNamespacedPath(filepath).replace(/\\/g, '/');
      return normalizedPath.split('src')[1];
}

module.exports = {
    isPathRelative,
    getNormalizedCurrentFilePath,
};
