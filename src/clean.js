const fs = require('fs');
const path = require('path');

const root = process.cwd();

module.exports = function cleanout(dir) {
  const p = path.join(root, dir);
  fs.rmSync(p, {
    force: true,
    recursive: true,
  });
}
