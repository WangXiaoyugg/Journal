import { resolvePath } from './util/path'
import {assert, warn} from './util/warn'
import {createRouteMap} from './create-route-map'

export function createMatcher(routes, router) {
    const {pathList, pathMap, nameMap} = createRouteMap(routes);

    function addRoutes(routes) {
        
    }

    function match(raw, currentRoute, redirectedFrom) {

    } 

    function redirect(record, location) {

    }


    function alias (record, location, matchAs) {

    }

    function _createRoute(record, location, redirectedFrom) {

    }

    function matchRoute(regex, path, params) {

    }

    function resolveRecordPath(path, record) {
        return resolvePath(path, record,parent ? record.parent.path : '/', true)
    }
}