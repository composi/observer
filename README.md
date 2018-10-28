# @composi/observer
A class to watch and send custom events.

## Install

```sh
npm i -D @composi/observer
```

After installing, you can import it into your project to use:

```javascript
import { Observer } from '@composi/observer'
```

## Create an Observer

Because Observer is a class, you must instantiate a new instance to use it:

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
```

## Create a Watcher

To use an observer you need to tell it to watch for an event. You do this by passing it the event and a callback to the observer's `watch` method. By default the callback with get passed a parameter holding any data that was passed when the event is sent. 

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
observer.watch('some-event' data => {
  console.log(`Received this data: ${data}`)
})
```

### Event with Multiple Watchers

You can create multiple watchers for the same event, but with different callbacks. In that case, when the event is send, all the callbacks will fire. You might do this when you want multiple components to respond to the same event.

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
// First watcher for 'some-event':
observer.watch('some-event' data => {
  console.log(`First watcher received this data: ${data}`)
})

// Second watcher for 'some-event':
observer.watch('some-event' data => {
  console.log(`Second watcher received this data: ${data}`)
})
```

### Ignore Event Data

You do not have to use data passed in a event. In fact, you can set up a watcher that just reacts to the event:

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
observer.watch('some-event' () => {
  console.log(`The event did fire!`)
})
```

Note: events are custom, so you can namespace them if you need to.

## Send an Event

After setting up a watcher for an event, you need to send the event to make the watcher react. You do this with the observer's `watch` method. This takes two arguments: the event to send and any optional data you want to send with the event.

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
observer.watch('some-event' data => {
  console.log(`Received this data: ${data}`)
})

// Sometime later:
observer.send('some-event', 'We are firing "some-event" now!')
// Console will log:
// Received this data: We are firing "some-event" now!
```

### Send Event without Data

As we mentioned earlier, you do not have to pass data with a sent event. Here we take the example of a watcher without data and send to it:


```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
observer.watch('some-event' () => {
  console.log(`The event did fire!`)
})

// Sometime later send event without data:
observer.distach('some-event')
// Console will log:
// The event did fire!
```

## Unwatch an Event

After registering an observer and watching an event, you may at some point want to turn it off. You do this by using the observer's `unwatch` method. This takes one argument: the event to unwatch.

In this example we set up an observer and later unwatch the event:

```javascript
import { Observer } from '@composi/observer'

const observer = new Observer()
observer.watch('some-event' data => {
  console.log(`Received this data: ${data}`)
})

// Sometime later:
observer.send('some-event', 'We are firing "some-event" now!')
// Console will log:
// Received this data: We are firing "some-event" now!

// Sometime later we unwatch the event:
observer.unwatch('some-event')
// Now sending to that even will do nothing:
observer.send('some-event', 'Sending to unwatched event.')
```

Note: if you have multiple watchers for an event and you unwatch it, this disables all watchers for that event.