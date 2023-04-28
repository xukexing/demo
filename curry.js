function curry(fun, ...arg1) {
  const originArgLength = fun.length
  if (arg1.length === originArgLength) return fun(...arg1)
  return function (...arg2) {
    return curry(fun, ...arg1, ...arg2)
  }
}

function test1(a, b, c) {
  return a + b + c
}

console.log(curry(test1, 4)(1)(2))
