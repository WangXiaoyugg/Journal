const getPort = require('./index.js');

(async () => {
	// console.log(await getPort({port: 8080}));
	console.log(await getPort());
	
	//=> 51402
})();