/**
 *  copy to 
 *  copy an object Properties to another one, include propertiy, getter and setter
 *  API
 *  copy(src).to(des)
 *  copy(src).toCover(des)
 *  copy(src).override(des)
 *  copy(src).pick("prop1", 'prop2').to(des)
 *  copy(src).and(other).to(des);
 *  copy(src).and(other).toCover(des);
 *  copy(src).and(second).and(third).to(des);
 *  copy(src).and(other).pick('proName1', 'proName2').to(des);
 *  copy(src).and(other).pick('proName1', 'proName2').toCover(des);
 *  copy(src).and(second).and(third).pick('proName1', 'proName2').to(des);
 *  
 *  It won't copy access(getter / setter) by default, if you want to copy them, please use:
 *  copy(src).withAccess().and(other).to(des)
 **/

'use strict'

const slice = Array.prototype.slice;

/**
 * @param {Object} src
 * @return {Copy}
 */

module.exports = Copy;

/**
 * Copy
 * @param {Object} src
 * @param {Boolean} withAccess
 */

function Copy(src, withAccess) {
    if(!(this instanceof Copy)) return new Copy(src, withAccess)
    this.src = src;
    this._withAccess = withAccess;
}


/**
 * copy properties include getter and setter
 * @param {[type]} val [description]
 * @return {[type]} [description]
 */
Copy.prototype.withAccess = function(w) {
    this._withAccess = w !== false;
    return this;
}

/**
 * pick keys in src
 *
 * @api: public
 */
Copy.prototype.pick = function (keys) {
    if(!Array.isArray(keys)) {
        keys = slice.call(arguments);
    }
    if (key.length) {
        this.keys = keys;
    }
    return this;
}

/**
 * copy src to target,
 * do not cover any property target has
 * @param {Object} to
 *
 * @api: public
 */
Copy.prototype.to = function(to) {
    to = to || {};
    // 拷贝对象不在，直接返回to
    if(!this.src) return to;
    var keys = this.keys || Object.keys(this.src)

    // 不考虑src对象的getter,setter
    if(!this._withAccess) {
        for (var i = 0; i < keys.length; i++ ){
            var key = keys[i]
            if(to[key] !== undefined) continue;
            to[key] = this.src[key]
        }
        return to;
    }
    // 考虑src对象的getter,setter
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (!notDefined(to, key)) continue;
        
        // Object.getOwnPropertyDescriptor(this.src, key).get
        // Object.getOwnPropertyDescriptor(this.src, key).set;
        var getter = this.src.__lookupGetter__(key);
        var setter = this.src.__lookupSetter__(key);
        // Object.defineProperty(to, key, {
        // get: function() {
        //    return  val;
        // },
        // set: function(newVal) {
        //  val = newVal;
        //}
        //});
        if(getter) to.__defineGetter__(key, getter);
        if(setter) to.__defineSetter__(key, setter);

        if (!getter && !setter) {
            to[key] = this.src[key];
        }
    }
    return to;
}

/**
 * copy src to target,
 * override any property target has
 * @param {Object} to
 *
 * @api: public
 */
Copy.prototype.toCover = function(to) {
    var keys = this.keys || Object.keys(this.src)
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        delete to[key];

        var getter = this.src.__lookupGetter__(key);
        var setter = this.src.__lookupSetter__(key);
        if(getter) to.__defineGetter__(key, getter);
        if(setter) to.__defineSetter__(key, setter);

        if (!getter && !setter) {
            to[key] = this.src[key];
        }
    }
}

Copy.prototype.override = Copy.prototype.toCover;

/**
 * append another object to src
 * @param {Obj} obj
 * @return {Copy}
 */

Copy.prototype.and = function(obj) {
    var src = {}
    this.to(src);
    this.src = obj;
    this.to(src);
    this.src = src;
    return this;
}

function notDefined(obj, key) {
    return obj[key] === undefined
        && obj.__lookupGetter__(key) === undefined
        && obj.__lookupSetter__(key) === undefined
}



