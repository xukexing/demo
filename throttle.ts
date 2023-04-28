/**
 * 节流-时间间隔实现
 * @param fn
 * @param wait
 */
function throttle1(fn, wait) {
  let preTime = 0
  return function (...args) {
    const context = this
    const nowTime = new Date().getTime()
    if (nowTime - preTime > wait) {
      preTime = new Date().getTime()
      fn.apply(context, args)
    }
  }
}

/**
 * 节流-定时器
 * @param fn
 * @param wait
 */
function throttle2(fn, wait) {
  let timer = null
  return function (...args) {
    const context = this
    if (!timer) {
      timer = setTimeout(function () {
        clearTimeout(timer)
        timer = null
      }, wait)
      fn.apply(context, args)
    }
  }
}