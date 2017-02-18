const content =
`function subscribe(listener) {
  if (typeof listener !== 'function') {
    throw new Error('Expected listener to be a function.')
  }

  let isSubscribed = true

  ensureCanMutateNextListeners()
  nextListeners.push(listener)

  return function unsubscribe() {
    if (!isSubscribed) {
      return
    }

    isSubscribed = false

    ensureCanMutateNextListeners()
    const index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
  }
}`;
  export default {
    source: 'https://github.com/reactjs/redux/blob/master/src/createStore.js',
    content,
  }
