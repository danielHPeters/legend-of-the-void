/**
 * Queue interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IQueue {
  /**
   *
   * @returns {any}
   */
  poll (): any

  /**
   *
   * @returns {any}
   */
  peek (): any

  /**
   *
   * @param object
   */
  add (object: any): void
}
