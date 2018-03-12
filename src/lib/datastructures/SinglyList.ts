import ListNode from './ListNode'
import IList from '../interfaces/IList'
import IQueue from '../interfaces/IQueue'

/**
 * Singly list implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SinglyList implements IList, IQueue {
  private _elementsCount: number
  private _head: ListNode
  private _errorMessages

  constructor () {
    this._elementsCount = 0
    this._head = null
    this._errorMessages = {
      indexOutOfBounds: 'Failure: non-existent index.',
      notImplemented: 'This feature is not yet implemented.'
    }
  }

  size (): number {
    return this.elementsCount
  }

  isEmpty (): boolean {
    return this._elementsCount === 0
  }

  contains (object: any): boolean {
    throw new Error(this._errorMessages.notImplemented)
  }

  remove (object: any): void {
    throw new Error(this._errorMessages.notImplemented)
  }

  add (object: any): void {
    let node = new ListNode(object)
    let currentNode = this._head

    if (this._elementsCount === 0) {
      this._head = node
    } else {
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this._elementsCount++
  }

  addAll (objects: any[]): void {
    objects.forEach(object => this.add(object))
  }

  clear (): void {
    this.head = null
  }

  set (index: number, value: any): void {
    throw new Error(this._errorMessages.notImplemented)
  }

  get (index: number): ListNode {
    let current = this._head

    if (this._elementsCount === 0 || index < 0 || index > this._elementsCount - 1) {
      throw new Error(this._errorMessages.indexOutOfBounds)
    }

    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }

  removeAt (index: number): void {
    if (index < 0 || index > this._elementsCount - 1) {
      throw new Error(this._errorMessages.indexOutOfBounds)
    }
    if (index === 0) {
      this._head = this._head.next
    } else {
      let current = this._head
      // Go to node before index
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      // Delete node by removing reference
      current.next = current.next.next
    }

    this._elementsCount--
  }

  poll (): any {
    let node = this.head
    this.head = this.head.next
    return node
  }

  peek (): any {
    return this.head
  }

  get elementsCount (): number {
    return this._elementsCount
  }

  set elementsCount (value: number) {
    this._elementsCount = value
  }

  get head (): ListNode {
    return this._head
  }

  set head (value: ListNode) {
    this._head = value
  }
}
