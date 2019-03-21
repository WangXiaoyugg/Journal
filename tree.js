// 假设这个 是 this.sate.resourceOfAppInfoList
let resourceOfAppInfoList = [
		{
			id: 1,
			level: 1,
			parentId: null,
			open: false,
			child: [
				{
					id: 2,
					level: 2,
					parentId: 1,
					open: false,
					child: [
						{
							id: 3,
							level: 3,
							parentId: 2,
							open: false,
							child: []
						}
					]
				},
				{
					
					id: 4,
					level: 2,
					parentId: 1,
					open: false,
					child: [],
				}
			]
		}
	]


function treeClick(curNode) {

	// 假设当前curNode 是 id为3， 找到它;
	// 树结构只有一个根节点
	
	// 先copy一份数据，在新数据上找到 id为3的节点 把它的open 属性重置 
	let copyList = this.state.resourceOfAppInfoList.map(v => v);

	// 根节点是数组的第一个元素
	let rootNode = copyList[0]

	// 只有一个根节点的树，
	// 或者curNode 就是根节点， 
	// 我只要把根节点的open取反
	if(rootNode.child.length === 0 || 
		curNode.parentId == null ||
		curNode.id == 1 ||
		curNode.level == 1
	) {
		rootNode.open = !rootNode.open
	} else {
		findNode(rootNode, curNode);	
	}	

	function findNode (node, curNode) {
		if(node.child.length === 0) return;
		for(let i = 0; i < node.child.length; i++) {
			let subNode = node.child[i];
			if(subNode.child.length === 0) {
				if(subNode.id === curNode.id){
					subNode.open = !subNode.open;
				} 
				break;
			} else {
				findNode(subNode, curNode);
			}
		}
	}

	this.setState({
		resourceOfAppInfoList: copyList,
	})

	

}
 
