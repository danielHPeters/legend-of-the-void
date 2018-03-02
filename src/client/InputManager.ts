import Observable from '../lib/observer/Observable'
import GameSettings from '../config/GameSettings'

export enum Actions {
  P1_UP = 'P1_UP',
  P1_DOWN = 'P1_DOWN',
  P2_UP = 'P2_UP',
  P2_DOWN = 'P2_DOWN',
  RESTART = 'RESTART',
  PAUSE = 'PAUSE'
}

/**
 * Input manager class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class InputManager extends Observable {
  inputMap

  /**
   *
   */
  constructor (settings: GameSettings) {
    super()
    this.inputMap = settings.keyboard
    this.init()
  }

  /**
   * Register pressed keys and notify observers.
   */
  init (): void {
    window.addEventListener('keydown', event => {
      let key = event.key !== ' ' ? event.key : 'space'
      this.state[this.inputMap[key]] = true
      this.notify()
    })
    window.addEventListener('keyup', event => {
      let key = event.key !== ' ' ? event.key : 'space'
      this.state[this.inputMap[key]] = false
      this.notify()
    })
  }

  reset (): void {
    Object.keys(this.state).forEach(key => this.state[key] = false)
  }
}
