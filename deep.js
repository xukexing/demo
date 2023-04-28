const clone = function (obj, weakMap = new WeakMap()) {
  if (typeof obj !== 'object') return obj

  const objCopy = Array.isArray(obj) ? [] : {}
  if (weakMap.has(obj)) return weakMap.get(obj)
  weakMap.set(obj, objCopy)

  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 事实上这里应该对日期、正则做特殊处理（此处为简陋版）
        objCopy[key] = clone(obj[key], weakMap)
      }
    }
  }
  return objCopy
}
