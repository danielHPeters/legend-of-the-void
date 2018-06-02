import QuadTree from './QuadTree'

/**
 * Collision manager interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface CollisionManager {
  quadTree: QuadTree

  /**
   * Detect collisions.
   */
  detectCollision (): void
}
