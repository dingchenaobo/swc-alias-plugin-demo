const fs = require('fs');
const path = require('path');

const clean = require('./clean');
const compile = require('./compile');
const getSources = require('./sources');
const { getTsConfig } = require('./config');

const root = process.cwd();
const tsConfig = getTsConfig();
const entry = process.argv[2];
const output = tsConfig.compilerOptions.outDir;
const complie_exts = ['.ts'];

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

clean(output);

fs.cpSync(entry, output, {
  recursive: true,
  filter: (f) => {
    return fs.statSync(f).isDirectory() || !complie_exts.includes(path.extname(f))
  }
}, error => {
  if (error) throw error;
});

getSources(entry, {
  exts: complie_exts,
}).forEach(file => {
  const sourceCode = fs.readFileSync(file.absolute, 'utf-8');
  const code = compile(sourceCode, file);
  const dest = path.normalize(path.join(root, output, file.dirname, `${file.basename}.js`));
  fs.writeFile(dest, code, {
    encoding: 'utf-8',
  }, error => {
    if (error) throw error;
  });
});
