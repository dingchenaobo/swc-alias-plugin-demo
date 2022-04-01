const fs = require('fs');
const { Visitor } = require('@swc/core/Visitor');

module.exports = class AliasPlugin extends Visitor {
  root = process.cwd();

  visitTsType(n) {
    return n;
  }

  visitImportDeclaration(n) {
    console.log(1, n.source.value);
    return n;
  }
}
