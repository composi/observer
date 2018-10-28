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
  observer.send('event-test', 'This is the sent data')
  expect(observerDataTest).toBe('This is the sent data')
})

test('Should be able to attach more than one watcher to the same event.', function() {
  expect(observer.events['event-test'].length).toBe(1)
  observer.watch('event-test', () => {
    return;
  })
  expect(observer.events['event-test'].length).toBe(2)
})

test('Should be able to send an event without data.', function() {
  const observer = new Observer()
  let eventFired = false
  let didReceivedData = false
  observer.watch('no-data', function (data) {
    if (data) didReceivedData = true
    eventFired = true
    expect(didReceivedData).toBe(false)
  })
  expect(eventFired).toEqual(false)
  observer.send('no-data')
  expect(eventFired).toEqual(true)
})

test('Dispatching an event that is not being watched should be ignored.', function () {
  expect(observer.events['nonexistent-event']).toBeUndefined()
  observer.send('nonexistent-event', 'This is the sent data')
  expect(observer.events['nonexistent-event']).toBeUndefined()

})

test('After unwatching a watched event, the event should not fire.', function() {
  const observer = new Observer()
  let result
  observer.watch('special_event', function (data) {
    result = data
  })
  observer.send('special_event', 'first fire.')
  expect(result).toEqual('first fire.')
  observer.unwatch('special_event')
  setTimeout(() => {
    observer.send('special_event', 'second fire.')
    // Because event is unwatched, result is unchanged:
    expect(result).toEqual('first fire.')
  }, 500)
})

