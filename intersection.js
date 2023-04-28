/**
 * 求交集
 * @param arr1
 * @param arr2
 * @return {*[]}
 */
function intersection(arr1, arr2) {
  let [shortArr, longArr] = [[], []]
  const arr = []
  if (arr1.length <= arr2.length) {
    [shortArr, longArr] = [arr1, arr2]
  }

  shortArr.forEach(item => {
    if (longArr.includes(item)) {
      arr.push(item)
    }
  })

  return arr
}