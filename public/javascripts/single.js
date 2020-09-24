// 实例：页面只有一个div
function createPopup (html) {
  var div = document.createElement('div')
  div.innerHTML = html || '<p>null/p>'
  document.body.append(div)
  return div
}
function getSinglet_p (fn) {
  var instance = null
  return function () {
    console.log('arguments',arguments)
    if(!instance) instance =  fn.apply(this,arguments) 
    return instance
  }
}
var popupSinglet = getSinglet_p(function () {
  var div = createPopup.apply(this,arguments)  // argument = 'a' | 'p' 
  console.log('this',this)
  return div
})
popupSinglet('a')
popupSinglet('p')
popupSinglet('p')
console.log('1',popupSinglet('a').innerHTML,'2',popupSinglet('p').innerHTML)