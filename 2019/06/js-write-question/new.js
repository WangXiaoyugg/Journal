/**
 * 实现 new 操作符
 *  1. 创建一个全新的对象
 *  2. 他会执行[[Prototype]] 就是__proto__链接
 *  3. 它使this指向新创建的对象
 *  4. 通过new 创建的每个对象将最终被[[prototype]]链接到
 * */

function New() {
    return {}
}