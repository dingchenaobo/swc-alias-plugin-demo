const path = require('path');
const glob = require('glob');

const root = process.cwd();

module.exports = function sources(entry, options = {}) {
  const exts = options.exts || ['.ts'];

  const paths = glob.sync(
    path.join(root, entry, '**/*'), {
      dot: true,
      nodir: true,
    },
  );

  if (!paths) return [];

  return paths
    .filter(p => exts.find(ext => p.endsWith(ext)))
    .map(p => {
      const file = {
        absolute: path.normalize(p),
        relative: path.normalize(path.relative(entry, p)),
        basename: path.basename(p, path.extname(p)),
      };

      file.dirname = path.dirname(file.relative);
      return file;
    });
}
