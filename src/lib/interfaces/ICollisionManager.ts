/**
 * Collision manager interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
import QuadTree from '../collision/QuadTree'

export default interface ICollisionManager {
  quadTree: QuadTree

  /**
   * Detect collisions.
   */
  detectCollision (): void
}
