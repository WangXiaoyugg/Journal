class EventEmitter {
	constructor() {
		this.stores = {}
		this.version = version
	}

	on(eventName, cb) {
		if(this.stores[eventName]) {
			this.stores[eventName].push(cb);
		} else {
			this.stores[eventName] = [];
		}
	}

	emit(eventName, options) {
		this.stores[eventName] && this.stores[eventName].forEach(item => {
			item(options);
		})

	}

	once(eventName, options) {


	}

	off(eventName) {
		this.stores[eventName] && delete this.stores[eventName];
	}

}