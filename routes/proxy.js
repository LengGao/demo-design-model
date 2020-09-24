/**
 * 三、代理模式
1. 定义

为一个对象提供一个代用品或占位符，以便控制对它的访问

2. 核心

当客户不方便直接访问一个 对象或者不满足需要的时候，提供一个替身对象 来控制对这个对象的访问，客户实际上访问的是 替身对象。

替身对象对请求做出一些处理之后， 再把请求转交给本体对象

代理和本体的接口具有一致性，本体定义了关键功能，而代理是提供或拒绝对它的访问，或者在访问本体之前做一 些额外的事情

3. 实现

代理模式主要有三种：保护代理、虚拟代理、缓存代理

保护代理主要实现了访问主体的限制行为，以过滤字符作为简单的例子
 */

//   主题发送信息
function sendMessage (msg) {
  console.log("msg",msg)
}
// 过滤
function proxySendMsg (msg) {
  if (typeof msg === 'undefinedd') {
    console.log('deny',msg) 
    return
  }
  msg = ('' + msg).replace(/泥\s*煤/g,'')  
  sendMessage(msg) 
}
sendMessage('泥煤呀泥 煤呀'); // 泥煤呀泥 煤呀
proxySendMsg('泥煤呀泥 煤'); // 呀
proxySendMsg(); // deny
//  有消息的时候对敏感字符进行了处理，这属于虚拟代理的模式
// 在滚动事件触发的时候，也许不需要频繁触发，我们可以引入函数节流，这是一种虚拟代理的实现

// 函数防抖，频繁操作中不处理，直到操作完成之后（再过 delay 的时间）才一次性处理
function debounce (fn, delay) {
  delay = delay || 200;
  var timer = null
  return function () {
    var arg = arguments;
    clearTimeout (timer)
    timer = null 
    timer = setTimeout(() => {
      fn.apply(this,arg)
    }, delay);
  }
} 
var count = 0;
// 主题
function scrollHandle (e) {
  console.log('scrollHandle', e.type, ++count)
}
// 代理
var proxyScrollHandle = (function () {
  return debounce(scrollHandle,500) 
})()
// window.onscroll = proxyScrollHandle; // 这样旧不能一直滚了

//  缓存代理可以为一些开销大的运算结果提供暂时的缓存，提升效率来个栗子，缓存加法操作
function add() {
  var arg = [].slice.call(arguments)
  return arg.reduce(function (a,b) {
    return a + b
  })
}
var proxyAdd= (function () {
  var cache = []
  return function () {
    var arg = [].slice.call(arguments).join(',')
      console.log("arguments join",arg)
      if (cache[arg]) {
        console.log('cache',cache)
        return cache[arg]
      } else {
        var ret = add.apply(this,arguments)
        console.log('cache',cache)
        return ret
    }
  }
})()
console.log(
  add(1, 2, 3, 4),
  add(1, 2, 3, 4),

  proxyAdd(10, 20, 30, 40),
  proxyAdd(10, 20, 30, 40)
); // 10 10 100 100