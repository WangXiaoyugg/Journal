import {assert} from './warn'
import {getStateKey, setStateKey} from './push-state'

// 创建一个原型为null的空对象
const positionStore = Object.create(null); 

export function setupScroll() {
// Fix for #1585 for Firefox
// Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
    window.history.replace({key: getStateKey()}, '',  window.location.href.replace(window.location.origin, ''))
    window.addEventListener("popstate", e => {
        saveScrollPosition();
        if(e.state && e.state.key) {
            setState(e.state.key);
        }
    })    
}
export function handleScroll (router, to, from, isPop) {
    // 当前路由的组件不存在
    if(!router.app) return;

    const behavior = router.options.scrollBehavior;
    if(!behavior) return;

    if(process.env.NODE_ENV !== 'production') {
        assert(typeof behavior === 'function', `scrollBehavior must be a function`)
    }
    // / wait until re-render finishes before scrolling
    router.app.$nextTick(() => {
        const position = getScrollPosition();
        // scrollBehavior (to, from, savedPosition) {}, 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
        // 返回的是一个对象
        const shouldScroll = behavior.call(router, to, from, isPop ? position : null);
        
        if(!shouldScroll) {
            return;
        }
        // 对象是一个promise
        if(typeof shouldScroll.then === 'function') {
           shouldScroll.then(shouldScroll => {
               scrollToPosition(shouldScroll, position)
           }).catch(err => {
            if (process.env.NODE_ENV !== 'production') {
                assert(false, err.toString())
              }
           })    
        } else {
            scrollToPosition(shouldScroll, position)
        }
    })

}

export function saveScrollPosition () {
    const key = getStateKey()
    if(key) {
        positionStore[key] = {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
    }
}

export function getScrollPosition() {
    const key = getStateKey()
    if(key) {
        return position[key];
    }
}

function getElementPosition(el, offset) {
    const docEl = document.documentElement
    const docRect = docEl.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    return {
        x: elRect.left - docRect.left - offset.x,
        y: elRect.top - docRect.top - offset.y,
    }   
}

function isNumber(v) {
    return typeof v === 'number';
}

function isValidPosition(obj) {
    return isNumber(obj.x) || isNumber(obj.y);
}
function normalizeOffset(obj) {
    return {
        x: isNumber(obj.x) ? obj.x : 0,
        y: isNumber(obj.y) ? obj.y : 0
    }
}
function normalizePosition(obj) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY
    // pageOffset, pageOffsetY 是 scrollX ,scrollY的别名
    return {
        x: isNumber(obj.x) ? obj.x: window.pageXOffset,
        y: isNumber(obj.y) ? obj.y: window.pageYOffset
    }
}

function scrollToPosition(shouldScroll, position) {
    const isObject = typeof shouldScroll === 'object';

    if(isObject && typeof shouldScroll.selector === 'string') {
        const el = document.querySelector(shouldScroll.selector)
        if(el) {
            let offset = shouldScroll.offset &&
                typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {}
            offset = normalizeOffset(offset)
            position = getElementPosition(el, offset);    
        } else if(isValidPosition(shouldScroll)) {
            position = normalizePosition(shouldScroll)
        }

    } else if (isObject && isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
    }

    // 关键代码，滚动到代码
    if (position) {
        window.scrollTo(position.x, position.y);
    }

}