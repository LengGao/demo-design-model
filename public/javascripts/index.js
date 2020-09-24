
/**
 * 模块设计
 * 即类的封装，分为公开，私有。保护 三种
 */

var module_private = (function () {
  var privated = ''
  return {
    hello: function () {
      console.log("hello module_private");
    }
  }
})()
var modules = document.querySelector('#modules')
