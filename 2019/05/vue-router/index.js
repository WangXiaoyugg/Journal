import {install} from './install'
import {createMatcher} from './create-matcher'
import {supportsPushState} from './util/push-state'

export default class VueRouter {
    constructor(options = {}) {
        this.app = null
        this.apps = []
        this.options = options;
        this.beforeHooks = [];
        this.afterHooks = [];
        this.resolveHooks = [];
        this.matcher = createMatcher(options.routes || [], this);
        let mode = options.mode || 'hash';
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        if(this.fallback) {
            mode = 'hash'
        }
        if(!inBrowser) {
            mode = 'abstract'
        }
        this.mode = mode;

        switch (mode) {
            case "history":
                // https://router.vuejs.org/zh/api/#base
                this.history = new HTML5History(this, options.base);
                break;
            case "hash":
                this.history = new HashHistory(this, options.base);
                break;
            case "abstract":
                this.history = new AbstractHistory(this, options.base);
                break;
            default:
                if(process.env.NODE_ENV !== 'production') {
                    assert(false, `invalid  mode: ${mode} `)
                }       
        }
    }

    match (raw, current) {

    }

    get currentRoute () {}

    /*@param app is a Vue component instance*/
    init (app) {
        process.env.NODE_ENV !== 'production'  && assert(
            install.installed,
            `not installed , Make sure to call \`Vue.use(VueRouter)\`
             bofore creating root instance   
            `
        )

        this.apps.push(app);
        
        // set up app destroyed handler    
        app.$once("hook:destroyed", () => {
            // clean out app from this.apps array once destroyed
            const index = this.apps.indexOf(app)
            if(index > -1) this.apps.splice(index, 1)
            // ensure we still have a main app or null if no apps
            // we do not release the router so it can be reused
            if(this.app === app) this.app = this.app[0] || null;
        }) 

        // main app previously initialized
        // return as we don't need to set up new history listener
        if(this.app) return;
        this.app = app;
        
        const history = this.history;

        // 也就是说init初始化的时候，如果是AbstractHistory不处理
        if(history instanceof HTML5History) {
            history.transitionTo(history.getCurrentLocation())
        } else if (history instanceof HashHistory) {
            const setupHashListener = () => {
                history.setupListeners()
            }
            history.transitionTo(
                history.getCurrentLocation(),
                setupHashListener,
                setupHashListener,
            )
            history.listen(route => {
                this.apps.forEach(app => {
                    app._route = route;
                })
            })
        }

    

    }
    beforeEach (fn) {

    }
    beforeResolve(fn) {

    }
    afterEach (fn) {

    }
    onReady(cb, errorCb) {

    }
    onError(errorCb) {

    }
    push(location, onComplete, onAbort) {

    }
    replace(location, onComplete, onAbort) {

    }
    go(n) {

    }
    back () {

    }
    forward() {

    }
    getMatchedComponents(to) {
    
    }
    resolve (to, current, append) {

    }
    addRoutes(routes) {

    }

}
function registerHook(list, fn) {
    list.push(fn);
    return () => {
        const i = list.indexOf(fn)
        if (i > -1) list.splice(i, 1)
    }
}
function createHref (base, fullPath, mode) {}

VueRouter.install = install;
VueRouter.version = "__VERSION__";

if(inBrowser && window.Vue) {
    window.Vue.use(VueRouter);
}