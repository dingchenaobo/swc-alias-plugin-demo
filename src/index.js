const { addHook } = require('pirates');
const { transformSync } = require('@swc/core');

const { getTsConfig } = require('./config');
const AliasPlugin = require('./alias.plugin');

const default_exts = ['.js', '.ts'];

function complie(sourceCode, filename) {
  const { code } = transformSync(sourceCode, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: false,
        decorators: true,
      }
    },
    module: {
      type: 'commonjs',
      noInterop: !getTsConfig().compilerOptions.esModuleInterop,
    },
    plugin: m => new AliasPlugin().visitProgram(m),
  });

  return code;
}

addHook((code, filanem) => complie(code, filanem), {
  ext: default_exts,
});
