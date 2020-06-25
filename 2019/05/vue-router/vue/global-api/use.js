function toArray(list, start) {
    // 等同于 array.slice(start, list.length);
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while(i--) {
        ret[i] = list[i + start]    
    }
    return ret;
}

export function initUse(Vue) {
    Vue.use = function(plugin) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        if(installedPlugins.indexOf(plugin) > -1) {
            return this;
        } 
        // additional parameters, 除去plugin的其他参数
        const args = toArray(arguments, 1);
        args.unshift(this)// 把 Vue 编程第一个参数
    
        if(typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin)
        return this;
    }
}
