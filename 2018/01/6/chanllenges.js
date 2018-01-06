
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