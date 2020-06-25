'use strict'

/**
 * 调用一个函数，扩展一个参数数组
 * ```js
 * function f(x, y, z) {}
 * var args = [1,2,3]
 * f.apply(null, args)
 * ```
 * 使用 `spread` 重写上面的例子
 * ```js
 * spread(function(x,y,z){})([1,2,3]);
 * ```
 */

module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    }
}
