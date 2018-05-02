import Vector2 from '../math/Vector2'
import Settings from '../../config/Settings'
import Dimension from '../geometry/Dimension'
import JsonSerializable from '../util/JsonSerializable'

/**
 * Base entity class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity implements JsonSerializable {
  id: string
  dimension: Dimension
  settings: Settings
  position: Vector2

  /**
   * Constructor. Sets position and dimension of entity.
   *
   * @param {Vector2} position Initial position
   * @param {Dimension} dimension Initial dimension
   * @param {Settings} settings
   */
  constructor (position?: Vector2, dimension?: Dimension, settings?: Settings) {
    this.position = position
    this.dimension = dimension
    this.settings = settings
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
      if (this.hasOwnProperty(key)) {
        this[key] = json[key]
      }
    })
  }
}
