/**
 * 数组扁平化-循环实现
 * @param arr
 * @param deep
 * @return {*[]|*}
 */
function arrayFlat(arr, deep) {
  if (arr.leng === 0 || (deep !== undefined && deep === 0)) return arr

  let res = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = [...res, ...arrayFlat(item, deep === undefined ? deep : deep - 1)]
    } else {
      res = [...res, item]
    }
  })

  return res
}

/**
 * 数组扁平化-reduce实现
 * @param arr
 * @param deep
 * @return {*[]|*}
 */
function arrayFlat1(arr, deep) {
  if (arr.leng === 0 || (deep !== undefined && deep === 0)) return arr

  return arr.reduce((sum, item) => {
    return [...sum, ...Array.isArray(item) ? arrayFlat1(item, deep === undefined ? deep : deep - 1) : [item]]
  }, [])
}

const res = arrayFlat1([1, [2, 3, [4, [5,6, 9, 20], 6, 7]]])
console.log(res, res.length)