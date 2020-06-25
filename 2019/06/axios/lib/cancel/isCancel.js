module.exports = function isCancel(val){
    return !!(val && val.__CANCEL__)
}