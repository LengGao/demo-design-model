/**
 * 策略模式
 * 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
 * 实现： 假设需要通过成绩等级来计算学生的最终得分，每个成绩等级有对应的加权值。
 */

// 集权映射关系
var levelMap = {
  S: 10,
  A: 8,
  B: 6,
  C: 4
 }
//  组策略
var scoreLevel = {
  basicScore: 80,
  S: function () {
    return this.basicScore+ levelMap['S']
  },
  A: function () {
    return this.basicScore + levelMap['A']
  },
  B: function () {
    return this.basicScore + levelMap['B']
  },
  C: function () {
    return this.basicScore + levelMap['C']
  }
}
//  使用
function getScore (level) {
  return scoreLevel[level] ? scoreLevel[level]() :0
} 
console.log(getScore('S')) 

// 校验
var errorMsg = {
  default: '输入数据格式不正确',
  minLength: '输入数据长度不足',
  isNumber: '青输入数字',
  required: '内容不为空'
}
var rules = {
  minLength: function (value,length,errorMsg) {
    if (value.length < length) {
      return errorMsg || errorMsg['minLength']
    }
  },
  isNumber: function (value,errorMsg) {
    if (!/\d+/.test(value)) {
      return errorMsg || errorMsg['isNumber']
    }
  },
  required: function (value,errorMsg) {
    if (!/\S+/.test(value)) {
      return errorMsg || errorMsg['required']
    }
  }
}
// 这就是JS 的简单实现
function Validator () {
  this.items = []
}
// 规则集
Validator.prototype = {
  constructor: Validator,
  // 调教校验规则
  add: function (value,rule,errorMsg) {
    var arg = [value]
    if (rule.indexOf('minLength') !== -1) {
      var temp = rule.split(':')
      arg.push(temp[1])
      rule = temp[0]
    }
    arg.push(errorMsg)
    this.items.push(function () {
      return rules[rule].apply(this,arg)
    })
  },
  // 开始校验
  start: function () {
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i]();
      if(element) {
        console.log("element",element,i);
      }
    }
  }
}
function testTel (val) {
  return val
}

var validate = new Validator()
validate.add(testTel('ccc'),'isNumber','只能为数字')
validate.add(testTel(''),'required','不能未空')
validate.add(testTel('123'),'minLength:5','最少5位')
validate.add(testTel('12345'),'minLength:5','最少5位')
var ret = validate.start();
console.log('ret',ret)

// 优点
// 可以有效地避免多重条件语句，将一系列方法封装起来也更直观，利于维护
// 缺点
// 往往策略集会比较多，我们需要事先就了解定义好所有的情况


// node ./routes/strategy.js