import { EntityType } from '../../enum/EntityType'

/**
 * Interface for collideable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */
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
