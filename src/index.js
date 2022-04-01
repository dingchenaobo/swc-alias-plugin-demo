const { addHook } = require('pirates');
const { transformSync } = require('@swc/core');

const AliasPlugin = require('../plugins/AliasPlugin');

const default_exts = ['.js', '.ts'];

function complie(sourceCode, filename) {
  const { code } = transformSync(sourceCode, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: false,
        decorators: false,
        dynamicImport: false
      }
    },
    module: {
      type: 'commonjs',
    },
    plugin: m => new AliasPlugin().visitProgram(m),
  });

  return code;
}

addHook((code, filanem) => complie(code, filanem), {
  ext: default_exts,
});
