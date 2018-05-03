/**
 * Interface for movable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Changeable {

  /**
   * Move entity.
   *
   * @param {number} dt Delta Time
   * @param {number} time current elapsed time
   */
  change (dt: number, time: number): void
}
