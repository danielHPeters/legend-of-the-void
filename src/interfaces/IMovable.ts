import Point from '../geometry/Vector2'

/**
 * Interface for movable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */

export default interface IMovable {
  velocity: Point
  acceleration: Point

  /**
   * Move entity.
   *
   * @param {number} dt Delta Time
   */
  move (dt: number): void
}
