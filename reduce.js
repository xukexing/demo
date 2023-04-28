/**
 * reduce
 * @param arr
 * @param cb
 * @param initialValue
 * @return {*}
 */
function reduce(arr, cb, initialValue) {
  if (!arr.length) return initialValue
  let res = initialValue === undefined ? arr[0] : initialValue

  const startIndex = initialValue === undefined ? 1 : 0
  for(let i = startIndex; i < arr.length; i++) {
    res = cb(res, arr[i], i, arr)
  }

  return res
}

Array.prototype.reduce = function (cb, initialValue) {
  const arr = this
  if (!arr.length) return initialValue
  let res = initialValue === undefined ? arr[0] : initialValue

  const startIndex = initialValue === undefined ? 1 : 0
  for(let i = startIndex; i < arr.length; i++) {
    res = cb(res, arr[i], i, arr)
  }

  return res
}

console.log(
  [1, 2, 3].reduce(
    (sum, item, index, context) => {
      return Array.isArray(sum) ? [...sum, item * 2] : [item * 2]
    }
  )
)