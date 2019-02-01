import Vector2 from '../math/Vector2'
import Collidable from './Collidable'
import { EntityType } from '../../enum/EntityType'

/**
 * Hitbox used for defining collision boundaries.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HitBox implements Collidable {
  type: EntityType
  collidesWith: EntityType[]
  colliding: boolean
  position: Vector2
  width: number
  height: number

  /**
   * Initializes position and dimension.
   * @param x position x
   * @param y position y
   * @param width dimension width
   * @param height dimension height
   */
  constructor (x: number, y: number, width: number, height: number) {
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
   * @param other
   * @returns
   */
  isCollideAbleWith (other: Collidable): boolean {
    return this.collidesWith.includes(other.type)
  }
}
