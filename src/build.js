const clean = require('./clean');
const compile = require('./compile');
const getSources = require('./sources');
const { getTsConfig } = require('./config');

const entry = process.argv[2];
const tsConfig = getTsConfig();
const complie_exts = ['.ts'];

clean(tsConfig.compilerOptions.outDir);

getSources(entry).forEach(file => {
  if (complie_exts.includes(file.extname)) {
    console.log(1, file);
    // const code = compile(filepath);
    // write([filepath], code);
  } else {
    console.log(2, file);
    // copy([from], [to]);
  }
});
