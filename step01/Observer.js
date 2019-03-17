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

// 浅度遍历对象，给每个属性添加getter、setter
function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key])
  })
}
// 设置getter、setter
function defineProperty(obj, key, val) {
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
