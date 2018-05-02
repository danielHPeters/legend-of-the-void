/**
 * Interface for collideable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */
import { EntityType } from '../../enum/EntityType'

export default interface Collidable {
  collidesWith: EntityType[]
  colliding: boolean
  type: EntityType

  /**
   *
   * @param {Collidable} other
   * @returns {boolean}
   */
  isCollideAbleWith (other: Collidable): boolean
}
