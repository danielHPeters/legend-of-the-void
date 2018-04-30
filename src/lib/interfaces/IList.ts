import ICollection from './ICollection'

/**
 * List interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IList<T> extends ICollection<T> {
  set (index: number, value: T): void

  get (index: number): T

  removeAt (index: number): void
}
