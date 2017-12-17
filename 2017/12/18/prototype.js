function Animal(){};
Animal.prototype.物种 = 'xxx'
Animal.prototype.行动 = function(){}

var animal = new Animal()

function Human(option){
	Animal.call(this,option)
	this.name = option.name || '';
	this.birthday = option.birthday || '';
}

Human.prototype = Object.create(Animal.prototype)
Human.prototype.constructor = Human;
Human.prototype.使用工具 = function(){};


var person = new Human({name:'garen',birthday:'2010-10-01'});

function Asian(option){
	Human.call(this,option)
	this.city = option.city || ''
}

Asian.prototype = Object.create(Human.prototype)
Asian.prototype.constructor = Asian
Asian.prototype.肤色 = 'yellow'

var asian = new Asian({city:'合肥',name:'garen',birthday:'2017-12-17'})
