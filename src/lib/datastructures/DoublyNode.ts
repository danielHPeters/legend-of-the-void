/**
 * List node element class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class DoublyNode<T> {
  public data: T
  public previous: DoublyNode<T>
  public next: DoublyNode<T>

  constructor (data: T) {
    this.data = data
    this.previous = null
    this.next = null
  }
}
