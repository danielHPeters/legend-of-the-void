import { EntityType } from '../enum/EntityType'

/**
 * Interface for collideable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface ICollideAble {
  collidesWith: EntityType[]
  colliding: boolean
  type: EntityType

  /**
   *
   * @param {ICollideAble} other
   * @returns {boolean}
   */
  isCollideAbleWith (other: ICollideAble): boolean
}
