// 原理：劫持数据，监听数据变化，通知订阅者，执行绑定的回调函数
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
  observe(val) // 监听子属性

  Object.defineProperty(obj, key, {
    enumerable: true, // 可以枚举 -- 可以被for in  Object.keys 遍历出来
    configurable: false,  // 不可再define
    get() {
      console.log('get :', val)
      return val
    },
    set(newVal) {
      console.log('set :', newVal)
      val = newVal
    }
  })
}
