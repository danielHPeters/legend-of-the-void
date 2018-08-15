import Vector2 from '../math/Vector2'
import Dimension from '../geometry/Dimension'
import JsonSerializable from '../util/JsonSerializable'
import Changeable from './Changeable'
import Renderable from './Renderable'
import Collidable from '../collision/Collidable'
import { AssetId } from '../../enum/AssetId'
import { EntityType } from '../../enum/EntityType'
import { ContextId } from '../../enum/ContextId'

/**
 * Base entity class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity implements JsonSerializable, Changeable, Renderable, Collidable {
  id: string
  dimension: Dimension
  position: Vector2
  alive: boolean
  asset
  assetId: AssetId
  collidesWith: EntityType[]
  colliding: boolean
  contextId: ContextId
  type: EntityType

  /**
   * Constructor. Sets position and dimension of entity.
   *
   * @param position Initial position
   * @param dimension Initial dimension
   */
  constructor (position?: Vector2, dimension?: Dimension) {
    this.position = position
    this.dimension = dimension
    this.alive = true
    this.collidesWith = []
  }

  init (): void {
    throw new Error('Implement in subclass.')
  }

  within (x: number, y: number): boolean {
    return x >= this.position.x
      && x <= this.position.x + this.dimension.width
      && y >= this.position.y
      && y <= this.position.y + this.dimension.height
  }

  /**
   * Create a JSON string from this object.
   *
   * @returns {string} The JSoN string
   */
  toJSON (): string {
    return JSON.stringify(this)
  }

  /**
   * Load data into this object from JSON.
   *
   * @param json JSON string
   */
  fromJSON (json: any): void {
    // Map parsed object to the attributes of this entity.
    Object.keys(json).forEach(key => {
      this[key] = json[key]
    })
  }

  change (dt: number, time: number): void {
    // Not implemented.
  }

  render (ctx: CanvasRenderingContext2D): void {
    if (this.asset && this.alive) {
      ctx.drawImage(this.asset, this.position.x, this.position.y, this.dimension.width, this.dimension.height)
    }
  }

  clear (ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }

  isCollideAbleWith (other: Collidable): boolean {
    return this.collidesWith.includes(other.type)
  }
}
