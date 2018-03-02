import Observer from './Observer'

/**
 * Observable class to be extended by a class that should be observed.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Observable {
  private _observers: Observer[]
  private _state: any

  constructor () {
    this._observers = []
    this._state = {}
  }

  /**
   * Register an observer on this observable.
   *
   * @param {Observer} observer Object implementing the Observer interface
   */
  register (observer: Observer): void {
    this._observers.push(observer)
  }

  /**
   * Remove an observer from this observables observers list.
   *
   * @param {Observer} observer Object implementing the Observer interface
   */
  unRegister (observer: Observer): void {
    this._observers = this._observers.filter(obs => {
      return obs !== observer
    })
  }

  /**
   * Notify all observers.
   */
  notify (): void {
    this._observers.forEach(observer => {
      observer.update(this._state)
    })
  }

  /**
   *
   * @returns {Observer[]}
   */
  get observers (): Observer[] {
    return this._observers
  }

  /**
   *
   * @param {Observer[]} observers
   */
  set observers (observers: Observer[]) {
    this._observers = observers
  }

  /**
   *
   * @returns {any}
   */
  get state (): any {
    return this._state
  }

  /**
   *
   * @param {any} state
   */
  set state (state: any) {
    this._state = state
  }
}
