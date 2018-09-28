'use strict'
import { Observer } from "../src"


let observerDataTest
const observer = new Observer()

test('New observer should have empty event property.', function () {
  expect(Object.keys(observer.events)).toHaveLength(0)
  expect(observer).toHaveProperty('events')
  expect(observer.events).toEqual({})
  expect(observerDataTest).toBeUndefined()
})

test('Dispatching "event-test" should trigger watcher for that event.', function() {
  observer.watch('event-test', data => {
    observerDataTest = data
  })
  expect(Object.keys(observer.events)).toHaveLength(1)
  expect(observer.events).toHaveProperty('event-test')
})

test('The observer watcher should have updated the value of observerDataTest.', function() {
  observer.dispatch('event-test', 'This is the dispatched data')
  expect(observerDataTest).toBe('This is the dispatched data')
})

test('Should be able to dispatch an event without data.', function() {
  const observer = new Observer()
  let eventFired = false
  let didReceivedData = false
  observer.watch('no-data', function (data) {
    if (data) didReceivedData = true
    eventFired = true
    expect(didReceivedData).toBe(false)
  })
  expect(eventFired).toEqual(false)
  observer.dispatch('no-data')
  expect(eventFired).toEqual(true)
})

test('Dispatching an event that is not being watched should be ignored.', function () {
  expect(observer.events['nonexistent-event']).toBeUndefined()
  observer.dispatch('nonexistent-event', 'This is the dispatched data')
  expect(observer.events['nonexistent-event']).toBeUndefined()

})

test('After unwatching a watched event, the event should not fire.', function() {
  const observer = new Observer()
  let result
  observer.watch('special_event', function (data) {
    result = data
  })
  observer.dispatch('special_event', 'first fire.')
  expect(result).toEqual('first fire.')
  observer.unwatch('special_event')
  setTimeout(() => {
    observer.dispatch('special_event', 'second fire.')
    // Because event is unwatched, result is unchanged:
    expect(result).toEqual('first fire.')
  }, 500)
})

