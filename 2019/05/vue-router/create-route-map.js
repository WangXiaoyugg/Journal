// https://github.com/pillarjs/path-to-regexp/blob/master/index.js
import RegExp from 'path-to-regexp'
import {clearPath} from './util/path'
import {assert, warn} from './util/warn'

// 生成路由映射表
export function createRouteMap (routes, oldPathList, oldPathMap, oldNameMap) {
    const pathList = oldPathList || []
    const pathMap = oldPathMap || Object.create(null)
    const nameMap = oldNameMap || Object.create(null)

    routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route)
    })

    for(let i = 0, l = pathList.length; i < l; i++) {
        // 把通配符匹配路由放在配置最后
        if(pathList[i] === '*') {
            pathList.push(pathList.splice(i, 1)[0])
            l--;
            i--;
        }
    }

    return {
        pathList,
        pathMap,
        nameMap,
    }
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
    const {path, name} = route;
    if (process.env.NODE_ENV !== 'production') {
        assert(path != null, `"path" is required in a route configuration.`)
        assert(
            typeof route.component !== 'string',
            `route config "component" for path: ${String(path || name)} cannot be a 
             string id. Use an actual component instead.
            `
        )
    }
    
    const pathToRegexpOptions = route.pathToRegexpOptions || {}
    const normalizePath = normalizePath(
        path, 
        parent,
        pathToRegexpOptions.strict
    ) 

    // 大小写敏感
    if (typeof route.caseSensitive === 'boolean') {
        pathToRegexpOptions.sensitive = route.caseSensitive
    }
    
    const record = {
        path: normalizePath,
        regex: compileRouteRegex(normalizePath, pathToRegexpOptions),
        components: route.components || {default: route.component },
        instances: {},
        name,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props: route.props == null ? {} : route.components ? route.props: {default: route.props}
    }

    if(route.children) {
        if(process.env.NODE_ENV !== 'production') {
            if( route.name  && 
               !route.redirect &&
               route.children.some(child => /^\/?$/.test(child.path)) 
            ) {
                warn(
                    false,
                    `Named Route '${route.name}' has a default child route.` +
                    `When navigating to this named route (:to="{name: '${route.name}'"), ` +
                    `the default child route will not be rendered. Remove the name from` +
                    `this route and use the name of the default child route for named` +
                    `links instead.`
                )        
            }
        }

        route.children.forEach(child => {
            const childMatchAs = matchAs ?
                clearPath(`${mathchAs}/${child.path}`)
                :undefined;
            addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)    
        })

        if(route.alias !== undefined) {
            const aliases = Array.isArray(route,alias)
                ? route.alias
                : [route.alias]
            aliases.forEach(alias => {
                const aliasRoute = {
                    path: alias,
                    children: route.children
                }
                addRouteRecord(
                    pathList,
                    pathMap,
                    nameMap,
                    aliasRoute,
                    parent,
                    record.path || '/'
                )
            })

        }

        if(!pathMap[record.path]) {
            pathList.push(record.path)
            pathMap[record.path] = record;
        }

        if (name) {
            if(!nameMap[name]) {
                nameMap[name] = record;
            } else if(process.env.NODE_ENV !== 'production' && !matchAs) {
                warn(
                    false,
                    `Duplicate named routes definition:` +
                    `{ name: "${name}", path: "${record.path}" }`
                )
            }
        }
    }

} 
function compileRouteRegex(path, pathToRegexpOptions) {
    const regex = RegExp(path, [], pathToRegexpOptions)
    if (process.env.NODE_ENV !== 'production') {
        const keys = Object.create(null)
        regex.keys.forEach(key => {
            warn(!keys[key.name], `Duplicate param keys in route with path: "${path}"`)
            keys[key.name] = true;
        })
        return regex;
    }
}

function normalizePath(path, parent, strict) {
    if(!strict) path = path.replace(/\/$/, '');
    if(path[0] === '/') return path;
    if(parent === null) return path;
    return clearPath(`${parent.path}/${path}`);
}