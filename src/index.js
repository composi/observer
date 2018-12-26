/**
 * Observer class providing two methods: watch and send.
 * It also exposes a method for setting state: `setState`.
 * `setState` works just like the same method on Composi class components.
 * When you use `setState` it sends a message to an instance of DataStoreComponent to update itself.
 */
export class Observer {
  constructor() {
    this.events = {}
  }

  /**
   * Method to subscribe to a publishing event.
   * @param {string} event
   * @param {Function} callback
   * @return {void} undefined
   */
  watch(event, callback) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].push(callback)
    } else {
      this.events[event] = [callback]
    }
  }

  /**
   *
   * @param {string} event
   * @param {any} [data]
   * @return {any[]} events
   */
  send(event, data) {
    // There's no event to send to, so bail out:
    if (!this.events.hasOwnProperty(event)) {
      return
    }
    return this.events[event].map(callback => callback(data))
  }

  /**
   * Remove an event from queue.
   * @param {string} event
   * @return {void} undefined
   */
  unwatch(event) {
    delete this.events[event]
  }
}
