const PROMISE_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

class Promise {
  constructor(executor) {
    this.status = PROMISE_STATUS.PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCb = []
    this.inRejectedCb = []

    const resolve = value => {
      if (this.status === PROMISE_STATUS.PENDING) {
        this.value = value
        this.status = PROMISE_STATUS.FULFILLED
        while(this.onFulfilledCb.length) {
          this.onFulfilledCb.shift()(value)
        }
      }
    }
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS.PENDING) {
        this.reason = reason
        this.status = PROMISE_STATUS.REJECTED
        while(this.inRejectedCb.length) {
          this.inRejectedCb.shift()(reason)
        }
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }


  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => new Error(reason)

    const createMicroTask = (handle, value, resolve, reject) => {
      process.nextTick(() => {
        try {
          const x = handle(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === PROMISE_STATUS.PENDING) {
        this.onFulfilledCb.push(() => createMicroTask(onFulfilled, this.value, resolve, reject))
        this.inRejectedCb.push(() => createMicroTask(onRejected, this.reason, resolve, reject))
      } else if (this.status === PROMISE_STATUS.FULFILLED) {
        createMicroTask(onFulfilled, this.value, resolve, reject)
      } else if (this.status === PROMISE_STATUS.REJECTED) {
        createMicroTask(onRejected, this.reason, resolve, reject)
      }
    })

    return promise2
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject('循环引用')
  }

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then = null
    try {
      then = x.then
    } catch (e) {
      reject(e)
    }
    let called = false
    if (typeof then === 'function') {
      try {
        then.apply(
          x,
          res2 => {
            if (called) return
            called = true
            resolvePromise(promise, res2, resolve, reject);
          },
          reason2 => {
            if (called) return
            called = true
            reject(reason2)
          }
        )
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

const request = () => {
  return new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
      resolve(2)

      console.log(3)
    }, 500)
  })
}
console.log('start')
const res = request()
  .then(
    res => {
      console.log(res)
    },
    reason => {
      console.log('reason', reason)
    }
  )
  .then(res => {
    console.log('第二次then')
  })
console.log('end')