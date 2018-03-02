import Dimension from '../../geometry/Dimension'
import Vector2 from '../../geometry/Vector2'

/**
 * HitBox used for collision detection.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HitBox {
  position: Vector2
  dimension: Dimension

  /**
   * Initializes position and dimension.
   * @param {number} x position x
   * @param {number} y position y
   * @param {number} width dimension width
   * @param {number} height dimension height
   */
  constructor (x, y, width, height) {
    this.position = new Vector2(x, y)
    this.dimension = new Dimension(width, height)
  }
}
