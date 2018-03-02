import Dimension from '../geometry/Dimension'
import { Actions } from '../client/InputManager'

/**
 * Pong game settings.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class GameSettings {
  gameSize: Dimension
  canvas: HTMLCanvasElement
  keyboard

  /**
   * Constructor.
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor (canvas: HTMLCanvasElement) {
    this.gameSize = new Dimension(canvas.width, canvas.height)
    this.canvas = canvas
    this.keyboard = {
      'w': Actions.P1_UP,
      's': Actions.P1_DOWN,
      'ArrowUp': Actions.P2_UP,
      'ArrowDown': Actions.P2_DOWN,
      'space': Actions.PAUSE,
      'r': Actions.RESTART
    }
  }

  /**
   *
   * @param value
   * @returns {string}
   */
  findKey (value): string {
    return Object.keys(this.keyboard).filter(key => this.keyboard[key] === value)[0]
  }

  /**
   *
   * @param newKey
   * @param {Actions} action
   */
  setKey (newKey, action: Actions): void {
    let oldKey = this.findKey(action)
    if (newKey !== oldKey) {
      console.log('old:' + oldKey, ' new: ' + newKey + ' value: ' + action)
      this.keyboard[newKey] = this.keyboard[oldKey]
      delete this.keyboard[oldKey]
    }
  }
}
