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
   * @param other
   * @returns
   */
  isCollideAbleWith (other: Collidable): boolean
}
