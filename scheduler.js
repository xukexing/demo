/**
 * 方式一：实例化时直接传入任务列表；手动调用run开始执行
 * @param initialTasks
 * @param max
 */
function scheduler(initialTasks, max = 2) {
  // 等待任务队列
  const waitingTaskQueue = initialTasks || []
  // 正在请求中的任务队列
  let pendingTaskNum = 0
  // 保存最外层resolve，当所有异步任务执行完成后调用
  let [resolveWrapper, rejectWrapper] = [null, null]
  
  // 执行任务
  const doTask = async task => {
    try {
      await task()
      pendingTaskNum--
      // 如果还有等待任务，则取出执行
      if (waitingTaskQueue.length) {
        pendingTaskNum++
        doTask(waitingTaskQueue.shift())
      }
      // 所有任务执行完成则resolve
      if (pendingTaskNum === 0) {
        resolveWrapper()
      }
    } catch (e) {
      rejectWrapper(e)
    }
  }

  // 手动调用 => 执行调度器中的任务
  this.run = () => {
    return new Promise((resolve, reject) => {
      [resolveWrapper, rejectWrapper] = [resolve, reject]
      try {
        for(let i = 0; i < max; i++) {
          pendingTaskNum++
          doTask(waitingTaskQueue.shift())
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}

const task1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('task1执行完成')
      resolve()
    }, 2000)
  })
}

const task2 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('task2执行完成')
      resolve()
    }, 1000)
  })
}

const task3 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('task3执行完成')
      resolve()
    }, 1000)
  })
}

const task4 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('task4执行完成')
      resolve()
    }, 1000)
  })
}

const task5 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('task5执行完成')
      resolve()
    }, 1000)
  })
}

const shcema = new scheduler([task1, task2, task3, task4, task5], 2)

shcema.run().then(res => {
  console.log('执行完成')
})
// 手动添加任务，自执行
function scheduler(max) {
  // 等待任务队列
  const waitingTaskQueue = []
  // 当前正在执行的任务数量
  let pendingTaskNum = 0

  // 添加任务方法
  this.add = task => {
    if (pendingTaskNum < max) {
      pendingTaskNum++
      runTask(task)
    } else {
      waitingTaskQueue.push(task)
    }
  }

  // 执行任务
  const runTask = async task => {
    await task()
    pendingTaskNum--

    if (waitingTaskQueue.length) {
      runTask(waitingTaskQueue.shift())
    }
  }
}

const schedulerInstance = new scheduler(2)
schedulerInstance.add(task1)
schedulerInstance.add(task2)
schedulerInstance.add(task3)
schedulerInstance.add(task4)
schedulerInstance.add(task5)