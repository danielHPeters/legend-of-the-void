import Dimension from '../lib/geometry/Dimension'
import { Actions } from '../enum/Actions'

/**
 * Legend of the void game settings.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Settings {
  gameSize: Dimension
  canvas: HTMLCanvasElement
  keyboard: any
  player: any

  /**
   * Constructor.
   *
   * @param canvas
   */
  constructor (canvas: HTMLCanvasElement) {
    this.gameSize = new Dimension(canvas.width, canvas.height)
    this.canvas = canvas
    this.keyboard = {
      'w': Actions.UP,
      's': Actions.DOWN,
      'ArrowUp': Actions.LEFT,
      'ArrowDown': Actions.RIGHT,
      'space': Actions.SHOOT,
      'r': Actions.RESTART
    }
  }

  /**
   *
   * @param value
   * @returns
   */
  findKey (value: string): string {
    return Object.keys(this.keyboard).filter(key => this.keyboard[key] === value)[0]
  }

  /**
   *
   * @param newKey
   * @param action
   */
  setKey (newKey: string, action: Actions): void {
    let oldKey = this.findKey(action)

    if (newKey !== oldKey) {
      console.log('old:' + oldKey, ' new: ' + newKey + ' value: ' + action)
      this.keyboard[newKey] = this.keyboard[oldKey]
      delete this.keyboard[oldKey]
    }
  }
}
