/**
 * Supply a warning to the developer that a method they are using
 * has been deprecated.
 *
 * @param {string} method The name of the deprecated method
 * @param {string} [instead] The alternate method to use if applicable
 * @param {string} [docs] The documentation URL to get further details
 */

// 对于废弃方法的处理，通过警告开发者用新的文档 新的api替代
module.exports = function deprecatedMethod(method, instead, docs) {
    try {
        console.warn(
            'DEPRECATED method `' + method + '`.' +
            (instead ? 'Use `' + instead + '` instead.': "") +
            'This method will be removed in future release.'
        )

        if(docs) {
            console.warn(`
                For more information about usage see ${docs}
            `)
        }
    } catch(e) {

    }
}