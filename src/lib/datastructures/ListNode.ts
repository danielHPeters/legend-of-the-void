/**
 * List node element class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class ListNode {
  private _data
  private _next: ListNode

  /**
   *
   * @param data
   */
  constructor (data) {
    this._data = data
    this._next = null
  }

  /**
   *
   * @returns {any}
   */
  get data () {
    return this._data
  }

  /**
   *
   * @param value
   */
  set data (value) {
    this._data = value
  }

  /**
   *
   * @returns {ListNode}
   */
  get next (): ListNode {
    return this._next
  }

  /**
   *
   * @param {ListNode} value
   */
  set next (value: ListNode) {
    this._next = value
  }
}
