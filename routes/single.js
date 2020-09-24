/**
 * single nodel 单例模式
 * 保证一个类见有一个实例，并提供一个访问它的全局访问点
 * 实现：假设要设置一个管理员，多次调用也仅设置一次，我们可以使用闭包缓存一个内部变量来实现这个单例
 */
function SetMessage (name) {
  this.message = name;
}
SetMessage.prototype.getName = function () {
  console.log('message',this.message)
}
var SingletonSetManager = (function () {
  var message = null;
  console.log("message1",message)
  return function (name) {
    if (!message) message = new SetMessage(name);
    console.log("message2",message)
    return message;
  }
})()
/**
 * 闭包等价于
 * var message = null;
 * fcuntion x (x) {
 *  if () { .... }
 *  return .....
 * }
 * x();
 * 相当于是讲message 变量绑定到了函数的执行上下文中，
 */
SingletonSetManager('a').getName(); // a
SingletonSetManager('b').getName(); // a
SingletonSetManager('c').getName(); // a

//  那么 上面实现了 SetMessage的单例模式，接下来抽象，让所有的类都可以单例
function getSingleton(fn) {
  var instance = null;
  
  return function() {
    if (!instance) {
      instance = fn.apply(this, arguments); //  this：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this  this === Global arguments === {0 : 'a'} 由函数调用时的上下文决定
      // instance = fn() // new出来的回事undefined，由此也可以得出猜想，fn参数会被，getSingleton的arguments兼并，也就是 fn  的arguments与getSingleton的arguments合并
      console.log("i",this,'2',arguments,"fn",fn, fn())
    }
    
    return instance;
  }
  
}
function SetHr(name) {
  this.hr = name;
}

SetHr.prototype.getName = function() {
  console.log('hr',this.hr);
};

var hrSingleton = getSingleton(function(name) {
  var hr = new SetHr(name);
  return hr;
});

hrSingleton('aa').getName(); // aa
hrSingleton('bb').getName(); // aa
hrSingleton('cc').getName(); // aa






// node ./routes/single.js

