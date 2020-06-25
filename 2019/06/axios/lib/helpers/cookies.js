const utils = requrie('./../utils')

module.exports = (
    utils.isStandardBrowserEnv() 
    ?(function standardBrowserEnv(){
        return {
            write: function write(name, value, expires, path, domain, secure){
                var cookies = []
                cookies.push(name + '=' + encodeURIComponent(value))
                if(utils.isNumber(expires)) {
                    cookies.push('expires=' + new Date(expires).toGMTString())
                }

                if(utils.isString(path)) {
                    cookies.push('path='+ path)
                }

                if(utils.isString(domain)) {
                    cookies.push('domain='+ domain)
                }
                
                if(secure === true) {
                    cookies.push('secure')
                }
                
                document.cookie = cookies.join('; ')

            },
            read: function read(name) {
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match
                var match = document.cookie.match(
                    new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
                )
                
                // decodeURIComponent macth[3] 就是value
                return (match ? decodeURIComponent(match[3]) : null)
            },
            remove: function remove(name) {
                this.write(name, '', Date.now() - 86400000)
            }
        }
    })()
    // Non standard browser env (web workers, react-native) lack needed support.
    :(function nonStandardBrowserEnv(){
        return {
            write: function write() {},
            read: function read() {return null},
            remove: function remove() {}
        }
    })() 

)
