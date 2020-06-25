export function extend(a, b) {
    for(let key in b) {
        a[key] = b[key]
    }
    return a;
}