exports.sayHello = () => console.log('Hello')

exports.sayHi = () => console.log('Hi!')

exports.hello = "Hello World"


exports.sayHello = this.sayHello;
exports.sayHi = this.sayHi;
exports.hello = this.hello;