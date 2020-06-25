import { inBrowser } from './dom'
import {saveScrollPosition} from './scroll'

// 返回的boolean值
export const supportsPushState = inBrowser && (function () {
    // 利用浏览器的 userAgent 判断是否支持 pushState
    const ua = window.navigator.userAgent
    if(
        (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1
    ) {
        return false;
    }

    return window.history && 'pushState' in window.history
    
})()

// https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now
const Time = inBrowser && 
            window.performance && 
            window.performance.now
            ? window.performance
            : Date;
        
let _key = genKey();

function genKey() {
    return Time.now().toFixed(3)
}
export function setStateKey() {
    _key = key;
}
export function getStateKey() {
    return _key;
}


export function pushState(url, replace) {
   // 保存切换后路由之前的滚动的位置
   saveScrollPosition()
   // try...catch the pushState call to get around Safari
   // DOM Exception 18 where it limits to 100 pushState calls
    const history = window.history;
    try {
        if(replace) {
            history.replaceState({key: _key}, '', url)
        } else {
            _key = genKey()
            history.pushState({key: _key}, '', url)
        }
    } catch (e) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Location/assign
        window.location[replace ? 'replace': "assign"](url)
    }
}

export function replaceState(url) {
    pushState(url, true)
}