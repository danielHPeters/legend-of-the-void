/**
 * Wrapper class for event handler convenience functions.
 */
export default class EventAssigner {
  /**
   * Register multiple events with the same event listener on one element.
   *
   * @param {HTMLElement} element html element to add the events to
   * @param {Array<string>} events the events to be registered
   * @param {EventListener} listener the event listener function
   */
  static registerOnElement (element: HTMLElement, events: Array<string>, listener: EventListener): void {
    events.forEach(event => element.addEventListener(event, listener))
  }
}
