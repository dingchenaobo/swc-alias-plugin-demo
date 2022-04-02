const path = require('path');
const glob = require('glob');

const root = process.cwd();

module.exports = function sources(entry) {
  const paths = glob.sync(
    path.join(root, entry, '**/*'), {
      dot: true,
      nodir: true,
    },
  );

  if (!paths) return [];

  return paths.map(p => ({
    absolute: p,
    relative: path.relative(entry, p),
    basename: path.basename(p),
    extname: path.extname(p),
  }));
}
