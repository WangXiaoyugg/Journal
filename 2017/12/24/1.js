function createHistory(options={}){
	//...

	return {
		listenBefore,
		listen,
		transitionTo,
		push,
		replace,
		go,
		goBack,
		goForward,
		createKey,
		createPath,
		createHref,
		createLocation,
	}
}


function createLocation(){
	return {
		pathname,
		search,
		hash,
		state,
		action,//push,replace,pop
		key,//生成方法 Math.random().toString(36).substr(2,length)
	}
}

// createBrowserHistory(HTML5)中的前进实现
function finishTransition(location){

	//...

	const historyState = {key};
	//...
	
	if(location.action === 'PUSH'){
		window.history.pushState(historyState,null,path)
	}else{
		window.history.replaceState(historyState,null,path)
	}
}

// createHashHistory的内部实现
function finishTransition(location){
	//...
	if(location.action === 'PUSH'){
		window.location.hash = path
	}else{
		window.location.replace(
			window.location.pathname + window.location.search + '#' + path
		)
	}
} 


// createMemoryHistory的内部实现
entries = [];
function finishTransition(location){
	//...
	switch (location.action) {
		case 'PUSH':
			entries.push(location)
			break;
		case 'REPLACE':
			entries[current] = location
			break;	
	}
}


// createBrowserHistory(HTML5)中的后退检测
function startPopStateListener({ transitionTo }){

	function popStateListener(event){
		//...
		transitionTo(getCurrentLocation(event.state))
	}

	addEventListener(window,'hashchange',hashChangeListener)
	//...
}

// createHashHistory的后退检测

function startPopStateListener({ transitonTo }){
	function hashChangeListener(event){
		//...
		transitionTo(getCurrentLocation(event.state));
	}

	addEventListener(window,'hashchange',hashChangeListener)
	//...
}


// createMemoryHistory的内部实现
function go(n){
	if(n){
		current += n
	}
	const currentLocation = getCurrentLocation();
	//change action to POP
	history.transitionTo({...currentLocation,action:POP})
}

// 为了维护state的状态，将其存储在sessionStorage里面:
// createBrowserHistory/createHashHistory中state的存储
function saveState(key,state){
	//...
	window.sessionStorage.setItem(createKey(key),JSON.stringify(state))

}

function readState(key){
	//...
	json = window.sessionStorage.getItem(createKey(key))
	return JSON.parse(json)
}


// createMemoryHistory仅仅在内存中，所以操作比较简单
const storage = createStateStorage(entries); // storage = {entry.key: entry.state}
function saveState(key,state){
	storage[key] = state
}
function readState(key){
	return storage[key]
}


// url => ui 同步
// url => location 
// ui 是由  react components 来决定
// location  => components 之间的同步问题











