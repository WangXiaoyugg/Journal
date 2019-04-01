/**
 * 二分查找法
 * 适用于有序数列,
 * 时间复杂度log(N)
 * [1,2,3,4,5,6,7,8,9]
 	
 * 递归实现二分查找，递归的性能会略差
 * 二分查找可能有重复元素
 * floor 在数组中第一次出现的位置，不存在返回之前的位置
 * ceil 在数组中最后一次出现的位置，不存在返回之后的位置
 * 
 */

// 返回数组元素的索引，找不到返回-1
// 传递一个数组，数组有n个，查找target

// const arr = [0,1,2,3,4,5,6,7,8,9]

// function binarySearch (arr, target) {
// 	// 查找区间是 [l, r]
// 	let l = 0, r = arr.length - 1;
// 	while(l <= r) {
// 		let mid = Math.floor(l + (r-l) / 2)
// 		if(arr[mid] === target) {
// 			return mid
// 		}

// 		if(arr[mid] > target) {
// 			r = mid - 1;
// 		} 

// 		if(arr[mid] < target) {
// 			l = mid + 1;
// 		}
// 	} 
// 	return -1;

// }

// const arr = [0,1,2,3,4,5,6,7,8,9]
// function binarySearch (arr, target) {
// 	// 查找区间是 [l, r) [0, 10]

// 	let l = 0, r = arr.length;
// 	while(l < r) {
// 		let mid = Math.floor(l + (r-l) / 2);
// 		console.log("mid: ", mid);
// 		if(arr[mid] === target) {
// 			return mid
// 		}

// 		if(arr[mid] > target) {
// 			r = mid;

// 		} 

// 		if(arr[mid] < target) {
// 			l = mid + 1;
		
// 		}
// 	} 
// 	return -1;

// }

// 二分查找递归实现
// const arr = [0,1,2,3,4,5,6,7,8,9]
// function binarySearchRecursive(arr, target) {
// 	// [0, 9]
// 	let l = 0, r = arr.length - 1;

// 	function search(arr, target, l, r) {
// 		if(l > r) return -1;
// 		let mid = Math.floor(l + (r - l) / 2);
// 		console.log("mid: ", mid);
// 		if(arr[mid] === target) {
// 			return mid;
// 		}

// 		if(arr[mid] > target) {
// 			r = mid -1;
// 			return search(arr, target, l, r)
// 		}

// 		if(arr[mid] < target) {
// 			l = mid + 1;
// 			return search(arr, target, l, r);
// 		}
// 	}

// 	return search(arr, target, l, r);

// }


// const index = binarySearchRecursive(arr, 100);
// console.log('result: ', arr[index], index);

/**
 * floor 在数组中查找target第一次出现的位置
 * 找到target, 返回第一个 target的索引
 * 没找到target, 返回比target的小最大值的索引，如果这个最大值有多个, 返回最大索引
 * 这个target比整个数组的最小元素还要小，则不存在这个target的floor值, 返回-1
 */

const arr = [0,1,1,2,3,3,4,5,5,7]

/**
 * assert( n >= 0 );

    // 寻找比target小的最大索引
    int l = -1, r = n-1;
    while( l < r ){
        // 使用向上取整避免死循环
        int mid = l + (r-l+1)/2;
        if( arr[mid] >= target )
            r = mid - 1;
        else
            l = mid;
    }

    assert( l == r );

    // 如果该索引+1就是target本身, 该索引+1即为返回值
    if( l + 1 < n && arr[l+1] == target )
        return l + 1;

    // 否则, 该索引即为返回值
    return l;
 */

function floor(arr, target) {
	let len = arr.length; 
	let min = arr[0]
	if(target < min) return -1;
	if(target === min) return min;
	let l = 0; r = arr.length - 1;
	while(l < r) {
		let mid = Math.floor(l + (r - l + 1)/2);
		if (arr[mid] >= target) {
			r = mid - 1
		} else {
			l = mid;
		}
	}
	console.log("l === r", l === r);

	// 如果该索引+1就是target本身, 该索引+1即为返回值
	if(l + 1 < len && arr[l+1] === target) {
		return l+1;
	}

	return l;
}

const res = floor(arr, 100);
console.log("res: ", res);

/**
 *二分查找法, 在有序数组arr中, 查找target
  如果找到target, 返回最后一个target相应的索引index
  如果没有找到target, 返回比target大的最小值相应的索引, 如果这个最小值有多个, 返回最小的索引
  如果这个target比整个数组的最大元素值还要大, 则不存在这个target的ceil值, 返回整个数组元素个数n
 
  
 */

function ceil(arr, target) {
	let len = arr.length;
	let l = 0, r = len;
	while(l < r) {
		let mid = Math.floor( l + (r - l)/ 2)

		if(arr[mid] <= target) {
			l = mid + 1;
		} else  {
			r = mid;
		}
	}
	// 终止条件是 l === r;

	// 如果该索引-1就是target本身, 该索引-1即为返回值
	if(r - 1 >= 0 && arr[r-1] == target) {
		return r -1;
	}
	return r;
}