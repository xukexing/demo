/**
 * 防抖函数
 * @param fn
 * @param wait
 * @param immediate
 */
function debounce(fn: Function, wait: number, immediate: boolean) {
  let timer = null
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    if (!immediate) {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    } else {
      if (!timer) fn.apply(context, args)
      timer = setTimeout(function () {
        timer = null
      }, wait)
    }
  }
}