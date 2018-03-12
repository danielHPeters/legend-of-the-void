import Vector2 from '../math/Vector2'
import ICollideAble, { EntityType } from '../interfaces/ICollideAble'

/**
 * Hitbox used for defining collision boundaries.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HitBox implements ICollideAble {
  type: EntityType
  collidesWith
  colliding: boolean
  position: Vector2
  width: number
  height: number

  /**
   * Initializes position and dimension.
   * @param {number} x position x
   * @param {number} y position y
   * @param {number} width dimension width
   * @param {number} height dimension height
   */
  constructor (x, y, width, height) {
    this.position = new Vector2(x, y)
    this.width = width
    this.height = height
    this.colliding = false
    this.collidesWith = []
    this.type = EntityType.BOX
    this.collidesWith.push(EntityType.PLAYER)
  }

  /**
   *
   * @param {ICollideAble} other
   * @returns {boolean}
   */
  isCollideAbleWith (other: ICollideAble): boolean {
    return this.collidesWith.includes(other.type.toString())
  }
}
