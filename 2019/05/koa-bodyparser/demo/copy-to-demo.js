const copy = require("../copy-to");

var src = {
    _name: 'foo',
    set name(val) {
      this._name = val;
    },
    get name() {
      return this._name;
    },
    show: function () {
      console.log(this._name);
    }
  };
  
  var des = {
    _name: 'bar',
    age: 18,
  };
  
//   copy(src).to(des); 
//   console.log(des); // {_name: 'bar', name: 'foo',show: function(){}}
//   copy(src).toCover(des);
//   console.log(des) // { _name: 'foo', name: [Getter/Setter], show: [Function: show], age: 18 }
// copy(src).override(des);
// console.log(des); //{ age: 18,_name: 'foo',name: [Getter/Setter],show: [Function: show] }
// copy(src).pick('_name', 'name').to(des);
// console.log(des); // { _name: 'bar', age: 18, name: 'foo' }
// copy(src).pick('_name', 'name').toCover(des);
// console.log(des); // { age: 18, _name: 'foo', name: [Getter/Setter] }

// copy(src).and({a:1, b:2}).to(des);
// console.log(des); // { _name: 'bar', age: 18, name: 'foo',show: [Function: show],a: 1,b: 2 }

