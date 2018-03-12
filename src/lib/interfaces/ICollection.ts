/**
 * Interface for collections.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface ICollection {
  /**
   *
   * @returns {number}
   */
  size (): number

  /**
   *
   * @returns {boolean}
   */
  isEmpty (): boolean

  /**
   *
   * @param object
   * @returns {boolean}
   */
  contains (object: any): boolean

  /**
   *
   * @param object
   */
  add (object: any): void

  /**
   *
   * @param object
   */
  remove (object: any): void

  /**
   *
   * @param {any[]} objects
   */
  addAll (objects: any[]): void

  /**
   *
   */
  clear (): void
}
