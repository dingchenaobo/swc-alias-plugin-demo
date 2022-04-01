const fs = require('fs');
const path = require('path');
const hjson = require('hjson');
const minimatch = require('minimatch');
const { Visitor } = require('@swc/core/Visitor');

module.exports = class AliasPlugin extends Visitor {
  root = process.cwd();
  alias = this.resolveAlias();

  resolveAlias() {
    const tsConfig = this.resolveTSConfigJson();
    if (tsConfig && tsConfig.compilerOptions && tsConfig.compilerOptions.paths) {
      return tsConfig.compilerOptions.paths;
    }
  }

  resolveTSConfigJson() {
    const tsConfigPath = path.normalize(path.join(this.root, 'tsconfig.json'));
    const tsConfigStr = fs.readFileSync(tsConfigPath, 'utf-8');
    return hjson.parse(tsConfigStr);
  }

  visitTsType(n) {
    return n;
  }

  visitImportDeclaration(n) {
    // const match = Object.keys(this.alias).find(alias => minimatch(n.source.value, alias));
    // if (match) {
    //   console.log(-1, match);
    //   console.log(0, this.alias);
    //   console.log(1, n.source.value);
    // }
    // n.source.value
    return n;
  }
}
