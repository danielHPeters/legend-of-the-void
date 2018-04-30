import Vector2 from '../math/Vector2'
import Settings from '../../config/Settings'
import Dimension from '../geometry/Dimension'
import IJSONSerializable from '../interfaces/IJSONSerializable'

/**
 * Base entity class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity implements IJSONSerializable {
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

  public init (): void {
    throw new Error('Implement in subclass.')
  }

  /**
   * Create a JSON string from this object.
   * 
   * @returns {string} The JSoN string
   */
  public toJSON (): string {
    return JSON.stringify(this)
  }

  /**
   * Load data into this object from JSON.
   *
   * @param json JSON string
   */
  public fromJSON (json: any): void {
    
    // Map parsed object to the attributes of this entity.
    Object.keys(json).forEach(key => {
      if ( this.hasOwnProperty( key ) ) {
        this[key] = json[key]
      }
    })
  }
}
