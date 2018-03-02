/**
 * Interface for observers.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Observer {
  /**
   *
   * @param {any} state
   */
  update (state: any): void
}
