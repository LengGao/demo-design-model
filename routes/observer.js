/**
 * 1. 定义

也称作观察者模式，定义了对象间的一种一对多的依赖关系，当一个对象的状态发 生改变时，所有依赖于它的对象都将得到通知

2. 核心

取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。

与传统的发布-订阅模式实现方式（将订阅者自身当成引用传入发布者）不同，在JS中通常使用注册回调函数的形式来订阅

3. 实现

JS中的事件就是经典的发布-订阅模式的实现
 */

 /**
  * JS中的事件就是经典的发布-订阅模式的实现
  * // 订阅
document.body.addEventListener('click', function() {
    console.log('click1');
}, false);

document.body.addEventListener('click', function() {
    console.log('click2');
}, false);

// 发布
document.body.click(); // click1  click2
  */

// 观察者 
var observer = {
  // 订阅集合
  subscribes: [],
  // 订阅
  subscribe: function (type,fn) {
    if (!this.subscribes[type]) {
      this.subscribes[type] = []
    }
    // 收集订阅者的处理
    typeof fn === 'function' && this.subscribes[type].push(fn)
  },
  // 发布 可能会携带一些信息发布出去
  publish: function () {
    var type = [].shift.call(arguments),
        fns = this.subscribes[type];
    // 不存在的订阅类型，以及订阅时未传入处理回调的
    if (!fns || !fns.length) return;
      // 挨个处理调用
    for (var i = 0; i<fns.length; ++i) {
      fns[i].apply(this,arguments)
    }
  },
  remove: function (type,fn) {
    if (typeof type === 'function') {
      this.subscribe = []
      return
    }
    var fns = this.subscribes[type];
    if (!fns || !fns.length) {
      return
    }
    if (typeof fn === 'undefined') {
      fns.length = 0
      return
    }
    for (let i = 0; i < fns .length; ++i) {
      if (fns[i] === fn) {
        fns.splice(i,1)
      } 
    }
  }
}
// 订阅岗位列表
function jobListForA(jobs) {
  console.log('A', jobs);
}

function jobListForB(jobs) {
  console.log('B', jobs);
}
// A订阅了笔试成绩
observer.subscribe('job', jobListForA);
// B订阅了笔试成绩
observer.subscribe('job', jobListForB);


// A订阅了笔试成绩
observer.subscribe('examinationA', function(score) {
    console.log(score);
});

// B订阅了笔试成绩
observer.subscribe('examinationB', function(score) {
    console.log(score);
});

// A订阅了面试结果
observer.subscribe('interviewA', function(result) {
    console.log(result);
});

observer.publish('examinationA', 100); // 100
observer.publish('examinationB', 80); // 80
observer.publish('interviewA', '备用'); // 备用

observer.publish('job', ['前端', '后端', '测试']); // 输出A和B的岗位


// B取消订阅了笔试成绩
observer.remove('examinationB');
// A都取消订阅了岗位
observer.remove('job', jobListForA);

observer.publish('examinationB', 80); // 没有可匹配的订阅，无输出
observer.publish('job', ['前端', '后端', '测试']); // 输出B的

/**
 * 4. 优缺点

优点

一为时间上的解耦，二为对象之间的解耦。可以用在异步编程中与MV*框架中

缺点

创建订阅者本身要消耗一定的时间和内存，订阅的处理函数不一定会被执行，驻留内存有性能开销

弱化了对象之间的联系，复杂的情况下可能会导致程序难以跟踪维护和理解
 */


// node ./routes/observer.js