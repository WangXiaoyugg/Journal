export function assert(condition, message) {
    if(!condition) {
        throw new Error(`[vue router] ${message}`)
    }
}

export function warn(condition, message) {
    if(!condition && process.env.NODE_ENV !== 'production') {
        typeof console !== 'undefined' && console.warn(
            `[vue-router] ${message}`
        )
    }
}

export function isError(err) {
    return Object.prototype.toString.call(err).indexOf("Error") > -1;
}