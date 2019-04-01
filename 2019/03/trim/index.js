// https://www.npmjs.com/package/trim
// x-tend: https://www.npmjs.com/package/xtend
// https://www.npmjs.com/package/x-is-string
// https://github.com/tj/node-tail

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};