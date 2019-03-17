// 劫持数据，监听数据变化，通知订阅者，执行绑定的回调函数
let obj = {
  x: 'test'
}
observe(obj)
obj.x
// get test
// test

obj.x = 1
// set 1
// 1

// 深度遍历对象，给每个属性添加getter、setter
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    // 不存在或者不是个对象，则返回；如果传进来一个字符串，Object.keys会将字符串解析成单个字符，进入后续步骤造成栈溢出
    return
  }
  // debugger // 可以在这里尝试debugger，会发现如果注释以上if条件，将会栈溢出
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key])
  })
}
// 设置getter、setter
function defineProperty(obj, key, val) {
  let dep = new Dep() // 在设置getter、setter，进行数据劫持的时候，添加消息订阅器
  observe(val) // 监听子属性

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
    get() {
      console.log('get :', val)
      return val
    },
    set(newVal) {
      if (val === newVal) return  // 如果值相同，就不进行通知
      console.log('set :', newVal)
      val = newVal
      dep.notify()  // 数据被改变时，触发setter 在setter中 调用 订阅该属性的消息订阅器的通知函数
    }
  })
}

// 消息订阅器 该消息订阅器可以存储多个订阅者
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()  //  消息订阅器的通知函数需要依次调用每个订阅者的更新函数
    })
  }
}
