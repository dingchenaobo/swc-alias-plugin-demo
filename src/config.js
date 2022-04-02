const fs = require('fs');
const path = require('path');
const hjson = require('hjson');

let tsConfig;
const root = process.cwd();

function getTsConfig() {
  if (tsConfig) return tsConfig;
  const tsConfigJsonPath = path.normalize(path.join(root, 'tsconfig.json'));
  tsConfig = hjson.parse(fs.readFileSync(tsConfigJsonPath, 'utf-8'));
  return tsConfig
}

module.exports = {
  getTsConfig,
}
