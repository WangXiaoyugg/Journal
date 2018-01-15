
function palindrome(str){
	
	var oldString = str.replace(/[,.,_,/,(,),\,:,]/g,'').toLowerCase();
	var newSting = oldString.split('').reverse().join('');
	return (oldString === newString)
}

function findLongestWord(str) {
  // 请把你的代码写在这里
  var newArr = str.split(/\b/).filter(function(item){
    return item !== ' '
  });
  var temp = newArr.map(function(item){
    return item.length;
  });
  
  var maxLength = Math.max.apply(null,temp)
  
  return maxLength ;
}

findLongestWord("The quick brown fox jumped over the lazy dog");


function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}


function findLongWord(string){
	var str = string.split(' ');
	var longest = 0;
	var word = null;
	for(let i=0;i<str.length-1;i++){
		if(longest < str[i].length){
			longest = str[i].length;
			word = str[i]
		}
	}
	return word;
}

function longestWord(string) {
    var str = string.split(" ");
    var longest = 0;
    var word = null;
    for (var i = 0; i < str.length - 1; i++) {
        if (longest < str[i].length) {
            longest = str[i].length;
            word = str[i];
        }
    }
    return word;
}

function titleCase(str) {
  // 请把你的代码写在这里
  var str = str.split(' ')
  for(var i=0;i<str.length;i++){
     str[i] = str[i][0].toUpperCase() +str[i].substr(1,str[i].length).toLowerCase();
  }
  str = str.join(' ')
  return str;
}

titleCase("I'm a little tea pot");

function largestOfFour(arr) {
  // 请把你的代码写在这里
  let temp = [];
  for(var i=0;i<arr.length;i++){
    var maxNumber = Math.max.apply(null,arr[i]);
    temp.push(maxNumber)
  }
  return temp;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

function confirmEnding(str,target){
	return str.substr(-target.length) === target ? true :false;
}


function repeat(str, num) {
  // 请把你的代码写在这里
  let temp = [];
  if (num < 0) {
    str = '';
  }else {
    for(var i=0;i<num;i++){
      temp.push(str)
    }
    str = temp.join('')
  }
  return str;
}

repeat("abc", 3);

//es2015 的实现
function repeatStringNumTimes(str, num) {
 if(num>0){
    return str.repeat(num);
  }
  return "";
}

//es5 实现的 string repeat
if(!String.prototype.repeat){
  String.prototype.repeat = function(count){
    'use strict';
    if(this == null){
      throw new TypeError('can"t convert '+ this + ' to Object')
    }
    var str = ''+this;
    count = +count;
    if(count != count){
      count = 0;
    }
    if(count < 0){
      throw new RangeError('repeat count must be non-negative')
    }
    if(count === Infinity){
      throw new RangeError('repeayt count must be less than Infinity')
    }
    count = Math.floor(count)
    if(str.length == 0 || count == 0){
      return ''
    }

    // 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
    // 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以
    // 1 << 28 => 268435456
    if(str.length * count >= 1 << 28){
      throw new RangeError('repeat count must not overflow overflow maximum string size')
    }

    var repeatStr = '';
    for(;;){
      if((count & 1) == 1){
        repeatStr += str;
      }
      count >>>= 1; // 0
      if(count === 0){
        break;
      }
      str += str
    }

    return repeatStr;
  }
}

function truncate(str, num) {
  // 请把你的代码写在这里
  var len = str.length;
  if(num <= 3){
    str = str.slice(0,num)+'...';
  }else if(num < len) {
    str = str.slice(0,num-3)+'...'
  }else if(num >= len){
     str = str; 
  }
  return str;
}
function truncateString(str, num) {
  if (str.length > num)
    return str.slice(0, num > 3 ? num-3 : num) + '...';
  return str;
}


truncate("A-tisket a-tasket A green and yellow basket", 11);

function chunk(arr, size) {
  // 请把你的代码写在这里
  let temp = [];
  for(var i=0;i<arr.length;i+=size){
    temp.push(arr.slice(i,i+size))
  }
  arr = temp
  return arr;
}


function chunkArrayInGroups(arr, size) {

  var temp = [];
  var result = [];

  for (var a = 0; a < arr.length; a++) {
    if (a % size !== size - 1)
      temp.push(arr[a]);
    else {
      temp.push(arr[a]);
      result.push(temp);
      temp = [];
    }
  }

  if (temp.length !== 0)
    result.push(temp);
  return result;
} 

chunk(["a", "b", "c", "d"], 2);


function slasher(arr, howMany) {
  // 请把你的代码写在这里
  var len = arr.length;
  if(howMany > len){
     arr = [];
  }else if (howMany === 0) {
    arr = arr;
  }else {
    arr = arr.slice(howMany,len)
  }
  
  return arr;
}

slasher([1, 2, 3], 2);

function mutation(arr){
  var test = arr[1].toLowerCase();
  var target = arr[0].toLowerCase();
  for(var i=0;i<test.length;i++){
    if(target.indexOf(test[i]) === -1){
      return false;
    }
  }
  return true;
}

function mutation(arr){
  return arr[1].toLowerCase()
      .split('')
      .every(function(letter){
        return arr[0].toLowerCase().indexOf(letter) !== -1
      })
}

function bouncer(arr) {
  return arr.filter(Boolean);
}


function destroyer(arr) {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < args.length; j++) {
      if (arr[i] === args[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(Boolean);
}

function destroyer(arr){
  var args = Array.from(agruments).slice(1);
  return arr.filter(function(val){
    return !args.includes(val)
  })
}

function where(arr, num) {
  // 请把你的代码写在这里
  var sortArr = arr.sort(function(a,b){return a-b})
  
  if(num > arr[arr.length -1]){
    return arr.length
  }
  
  for(var i=0;i<sortArr.length;i++){
    if(num <= arr[i]){
      return i;
    }
  }
}

where([40, 60], 50);

function where(arr,num){
  arr.push(num);
  arr.sort(function(a,b){
    return a-b;
  })
  return arr.indexOf(num);
}

function where(arr,num){
  var index = arr.sort((curr,next)=> curr > next)
                .findIndex((currNum) => num < currNum);
  return index === -1 ? arr.length : index;              
}

function rot13(str){
  return str.split('')
  .map.call(str,function(char){
    x = char.charCodeAt(0);
    if( x < 65 || x > 90){
      return String.fromCharCode(x);
    }else if(x < 78){
      return String.fromCharCode(x + 13);
    }
    return String.fromCharCode(x - 13);
  }).join('')
}

function rot13(str){
  var rotCharArray = [];
  var rotReg = /[A-Z]/;
  str = str.split('');
  for(var x in str){
    if(rotReg.test(str[x])){
      rotCharArray.push(( str[x].charCodeAt() - 65 + 13) % 26 + 65);
    }else{
      rotCharArray.push(str[x].charCodeAt())
    }
  }

  str = String.fromCharCode.apply(String,rotCharArray)
  return str
}

rot13 = (str)=>{
  return str.replace(/[A-Z]/g,(L)=> {
    return String.fromCharCode((L.charCodeAt(0) %26)+65)
  })  
}

function sumAll(arr){
  var max = Math.max(arr[0],arr[1]);
  var min = Math.min(arr[0],arr[1]);
  var sum = 0;
  for(var i=0;i<=max;i++){
    sum += i;
  }
  return sum;
}


function sumAll(arr) {
  var start;
  var end;
  var sum;
  // if(arr[0] < arr[1]){
  //   start = arr[0];
  //   end = arr[1];
  // }else {
  //   start = arr[1];
  //   end = arr[0];
  // }
  // var sortArr = arr.sort((a,b) => a-b);
  // start = arr[0];
  // end = arr[1];

  start = Math.min(...arr);
  end = Math.max(...arr);

  sum = ((start+end) * (end-start + 1))/2;
  
  return sum;
}

sumAll([1, 4]);

function sumAll(arr){
  var sum = 0;
  for(var i=Math.min(...arr);i<=Math.max(...arr);i++){
    sum += i
  }
  return sum
}

function diffArray(arr1,arr2){
  var newArr = []

  function onlyInFirst(first,second){
    for(var i=0;i<first.length;i++){
      if(second.indexOf(first[i] === -1)){
        newArr.push(first[i])
      }
    }
  }

  onlyInFirst(arr1,arr2)
  onlyInFirst(arr2,arr1)
  return  newArr;
} 


function diffArray(arr1,arr2){
  return arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item))
}


function diffArray(arr1,arr2){
  return arr1.filter(el => !arr2.includes(el))
              .concat(
                  arr2.filter(el => !arr1.includes(el))
              )
}

//罗马数字
var convertToRoman = function(num){
  var decimalValue = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  var romanNumeral = ['M',"CM",'D',"CD","C","XC","L","XL","X","IX","V","IV","I"];

  var romanized = '';

  for(var index=0;index<decimalValue.length;index++){
    while(decimalValue[index] <= num){
      romanized += romanNumeral[index];
      num -= decimalValue[index];
    }
  }

  return romanized;
}


function convertToRoman(num){
  var romans = ['I','V','X','L','C','D','M'],
      ints = [],
      romanNumber = [],
      numeral = '';

 while(num){
  ints.push(num % 10);
  num = Math.floor(num /10);         
 } 
 for(i=0;i<ints.length;i++){
    units(ints[i]);
  }    

  function units(){
    numeral = romans[i *2];
    switch(ints[i]){
      case 1:
        romanNumber.push(numeral);
      case 2:
        romanNumber.push(numeral.concat(numeral))
      case 3:
         romanNumber.push(numeral.concat(numeral).concat(numeral))
      case 4:
         romanNumber.push(numeral.concat(romans[(i*2)+1]));
      case 5:
          romanNumber.push(romans[(i*2)+1]);
      case 6:
        romanNumber.push(romans[(i*2)+1].concat(numeral));
        break;
      case 7:
        romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral));
        break;
      case 8:
        romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral).concat(numeral));
        break;
      case 9:
        romanNumber.push(romans[i*2].concat(romans[(i*2)+2]));
      }            
    }
    return romanNumber.reverse().join('').toString();
  }
}


function convertToRoman(num){
  var romans = [
      ["I","V"], // 10 ^ 0
      ["X","L"], //10 ^ 1
      ["C","D"] , // 10 ^ 2
      ["M"], //10^  
  ],
  digits = num.toString().split('').reverse().map((item,index) => {
    return parseInt(item);
  })
  numeral= '';

  for(var i=0;i<digits.length;i++){
    numeral = romans[i][0].repeat(digits[i]) + numeral;

    if(romans[i][1]){
      numeral = numeral
            //Change occurrences of 5 * 10^i to the corresponding 5-multiple Roman numeral
            .replace(romans[i][0].repeat(5),romans[i][1])
            // Shorten occurrences of 9 * 10^i
            .replace(romans[i][1] + romans[i][0].repeat(4),romans[i][0] + romans[i+1][0])
            // Shorten occurrences of 4 * 10^i
            .replace(romans[i][0].repeat(4), romans[i][0] + romans[i][1])
    }
  }
























}