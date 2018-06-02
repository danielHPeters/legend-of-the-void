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
   * @param dt Delta Time
   * @param time current elapsed time
   */
  change (dt: number, time: number): void
}
