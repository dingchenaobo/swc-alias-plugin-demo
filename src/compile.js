const { transformSync } = require('@swc/core');

const { getTsConfig } = require('./config');
const AliasPlugin = require('./alias.plugin');

module.exports = function compile(sourceCode, file) {
  const { code } = transformSync(sourceCode, {
    minify: true,
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
    plugin: m => new AliasPlugin(file).visitProgram(m, file)
  });

  return code;
}