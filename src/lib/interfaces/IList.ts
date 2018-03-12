import ICollection from './ICollection'

/**
 * List interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IList extends ICollection {
  set (index: number, value: any): void

  get (index: number): any

  removeAt (index: number): void
}
