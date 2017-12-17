class Animal {
	constructor(option){
		this.物种 = option.物种 || ''
	}
	行动(){}
}

var animal = new Animal({物种:'xxx'})

class Human extends Animal {
	constructor(option){
		super(option)
		this.name = option.name || ''
		this.birthday = option.birthday || ''
	}
	使用工具(){}
}


var person = new Human({name:'garen',birthday:'2017-12-18'})

class Asian extends Human {
	constructor(option){
		super(option)
		this.city = option.city || ''
		this.肤色 = option.肤色 || ''
	}

}

var asian = new Asian({city:'合肥',name:'garen',birthday:'2018-12-18'})