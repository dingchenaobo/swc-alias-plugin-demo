const fs = require('fs');
const path = require('path');
const hjson = require('hjson');
const { Visitor } = require('@swc/core/Visitor');

module.exports = class AliasPluginVisitor extends Visitor {
  root = process.cwd();
  alias = this.resolveAlias();

  visitTsType(n) {
    return n;
  }

  resolveAlias() {
    const config = this.resolveTsConfigJson();
    if (config && config.compilerOptions && config.compilerOptions.paths) {
      const aliasObj = config.compilerOptions.paths;
      return Object.fromEntries(
        Object.keys(aliasObj).map(alias => [
          this.resolveAliasPathRegexpStr(alias),
          aliasObj[alias],
        ]),
      );
    }
    return null;
  }

  resolveTsConfigJson() {
    const tsConfigJsonPath = path.normalize(path.join(this.root, 'tsconfig.json'));
    return hjson.parse(fs.readFileSync(tsConfigJsonPath, 'utf-8'));
  }

  resolveAliasPathRegexpStr(alias) {
    return '^' + alias.replace(/\*/, '([\\s|\\S]*)') + '$';
  }

  visitImportDeclaration(n) {
    const matchAliasKey = Object.keys(this.alias).find(aliasRegexp => new RegExp(aliasRegexp).test(n.source.value));

    if (matchAliasKey) {
      const patMatchStr = new RegExp(matchAliasKey).exec(n.source.value)[1];

      for (let i = 0, len = this.alias[matchAliasKey].length; i < len; i += 1) {
        const targetPath = this.alias[matchAliasKey][i];
        const realPath = path.join(this.root, targetPath.replace(/\*/, patMatchStr));
          
        if (this.existsSync(realPath)) {
          return {
            ...n,
            source: {
              ...n.source,
              value: realPath,
            },
          };
        }
      }
    }

    return n;
  }

  existsSync(path) {
    const exts = ['', '.js', '.es6', '.es', '.mjs', '.ts', '.cjs', '.json'];

    return exts.some(ext => fs.existsSync(path + ext));
  }
}
