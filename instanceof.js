function myInstanceof(target, origin) {
  if (typeof target !== 'object' || target === null) return false

  if (typeof origin !== 'function') {
    throw new TypeError('origin must is a Function')
  }

  let proto = Object.getPrototypeOf(target)
  while (proto) {
    if (proto === origin.prototype) return true
    else proto = Object.getPrototypeOf(proto)
  }
  return false
}