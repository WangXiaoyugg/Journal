/**
 * 它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，
 * 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 以此类推，直到全部待排序的数据元素排完。
 */
function swap (array, i,j) {
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function selectSort(array) {
	let len = array.length;

	for(let i = 0; i < len; i++) {
		let minIndex = i;
		// 找最小的值的索引
		for(let j = i + 1; j < len ; j++) {
			if(array[j] < array[minIndex]) {
				minIndex = j;
			}
		}
	   swap(array, i, minIndex);
				
	}
	return array;
}

var r1 = selectSort([5,4,3,6,7,8,1,2])
// 当前排序不支持对象，类型校验;
console.log("result:", r1);