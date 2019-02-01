import Observable from '../observer/Observable'
import Settings from '../../config/Settings'

/**
 * Input manager class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class InputManager extends Observable {
  inputMap: any

  constructor (settings: Settings) {
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

  shoot (): void {
    this.state[this.inputMap['space']] = true
  }

  cancelShoot (): void {
    this.state[this.inputMap['space']] = false
  }

  reset (): void {
    this.state[this.inputMap['w']] = false
    this.state[this.inputMap['a']] = false
    this.state[this.inputMap['s']] = false
    this.state[this.inputMap['d']] = false
  }
}
