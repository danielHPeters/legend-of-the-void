import Entity from './Entity'
import ICollideAble from '../interfaces/ICollideAble'
import GameSettings from '../config/GameSettings'
import Vector2 from '../geometry/Vector2'

/**
 * Pong board class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Board extends Entity {
  /**
   *
   * @param {GameSettings} settings
   */
  constructor (settings: GameSettings) {
    super(new Vector2(0, 0), settings.gameDimension, settings.backgroundColor, settings)
  }

  init (): void {
    // unused
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }

  /**
   *
   * @param {number} dt
   */
  move (dt: number): void {
    // unused
  }
}
