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

// 遍历对象，给每个属性添加getter、setter
function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key])
  })
}
// 设置getter、setter
function defineProperty(obj, key, val) {
  observe(val) // 监听子属性

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: false,
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
