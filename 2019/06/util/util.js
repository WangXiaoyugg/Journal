/**
 *  开发中常用的 25个 javascript 代码
 * */

// 1. 强制布尔值 
!!null; // false
!!undefined; //false
!!false; //false
!!true; // true
!!""; // false
!!"string"; // true
!!0; //false
!!1; //true
!!{}; //true
!![]; // true

// 2. 基于某个条件为对象设置属性
let myProp = 'Garen'
const myObj = {...myProp && {propName: myProp}} // {propName: "Jhon"}
let myProp1 = ''
const myObj1 = {...myProp1 && {propName: myProp1}} // {}

// 3. 合并对象
const mergeObj = {...{name: 'garen', age: 20}, ...{name:'garen', age: 18}}

// 4. 交换变量
let a = 1;
let b = 2;
[a, b] = [b, a] // a = 2, b = 1;

// 5. 删除 Boolean 为 false的值
const clean = [0, false, undefined, true, null, '', 10].filter(Boolean);

// 6. 转化元素类型
const stringArray = [1,2,3].map(String);

// 7. 格式化对象为JSON代码
const formatted = JSON.stringify({name:'garen', age: 18}, null, 4)

// 8. 快速创建数字数组
const numArray = Array.from(new Array(10), (x,i) => i);

// 9. 随机生成6位数字验证码
const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

// 10. 身份证正则
const IDRegex = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/

// 11. window.location.search 转 JS
const searchObj = search => JSON.parse(`
{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}
`)

// 12. JS对象转url查询字符串
const objToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&')

// 13. 获取数组交集
const similarity = (arr, values) => arr.filter(v => values.includes(v));

// 14. 检测设备类型
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

// 15. 将数字转化为千分位的格式
const toDecimalMark = num => num.toLocaleString("en-US")

// 16. 多维数组转成以为一维数组
const deepFlatten = arr => [].concat(...arr.map(
    v => Array.isArray(v) ? deepFlatten(v) : v
));

// 17. 过滤对象数组
const reducedFilter = (data, keys, fn) => data.filter(fn)
    .map(el => keys.reduce((acc, key) => {
        acc[key] = el[key];
        return acc; 
    }, {})
)

// 18. 驼峰字符串串格式化
const fromCamelCase = (str, separator = '_') => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();

// 19. 是否为绝对地址
const isAbsoluteURL = str =>  /^[a-z][a-z0-9+.-]*:/.test(str);

// 20. 获取两个日期相差的天数
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);

// 21. 数组去重
const deDupe = (arr) => [...newSet(arr)]

// 22. 数组对象去重
const uniqueElementsBy =  (arr, fn) => 
    arr.reduce(
        (acc, v) => {
            if (!acc.some(x => fn(v, x))) 
                acc.push(v);
            return acc;
    }, []);

// 23. RGB 颜色转 16进制颜色
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
   
// 24. 常用密码组合正则
const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/

// 25. 判断dom元素是否具有某个className
const hasClass = (el, className) => new RegExp(`(^|\\s)${className}(\\s|$)`).test(el.className);
