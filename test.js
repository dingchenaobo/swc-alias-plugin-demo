const minimatch = require('minimatch');

function matchTxt(txt) {
  return minimatch(txt, '@');
}

console.log(
  matchTxt('@'),
  matchTxt('@/a'),
  matchTxt('@/a/b'),
  matchTxt('@/a/b/c'),
)
