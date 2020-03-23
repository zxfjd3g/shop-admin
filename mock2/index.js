import Mock from 'mockjs'

// 动态加载各个module下的MOCK
['config'].forEach((moduleName) => {
  const mockModule = () => import(`./${moduleName}`)
  mockModule().then((res) => {
    const fnObj = res.default || {}
    Object.keys(fnObj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(fnObj, key)) {
        const mock = fnObj[key]
        if (!mock.url) {
          console.error(`${moduleName}模块中的MOCK方法：${key}没有定义方法`)
          return
        }
        Mock.mock(
          mock.url, 
          mock.method || /post|get/i, 
          mock.data || { msg: '请定义MOCK返回的数据', result: '', successFlag: 0 }
        )
      }
    })
  }).catch((error) => {
    console.error(`加载模块[${moduleName}]出现异常：${error}`)
  })
})
