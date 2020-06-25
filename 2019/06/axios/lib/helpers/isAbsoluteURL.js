module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}