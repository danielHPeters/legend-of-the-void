import Observer from './Observer'

/**
 * Observable class to be extended by a class that should be observed.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Observable {
  protected observers: Observer[]
  protected state: any

  constructor () {
    this.observers = []
    this.state = {}
  }

  /**
   * Register an observer on this observable.
   *
   * @param observer Object implementing the Observer interface
   */
  register (observer: Observer): void {
    this.observers.push(observer)
  }

  /**
   * Remove an observer from this observables observers list.
   *
   * @param observer Object implementing the Observer interface
   */
  unRegister (observer: Observer): void {
    this.observers = this.observers.filter(obs => { return obs !== observer })
  }

  /**
   * Notify all observers.
   */
  notify (): void {
    this.observers.forEach(observer => observer.update(this.state))
  }
}
