import Vector2 from '../math/Vector2'
import Settings from '../../config/Settings'
import Dimension from '../geometry/Dimension'

/**
 * Base entity class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity {
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
  constructor (position: Vector2, dimension: Dimension, settings: Settings) {
    this.position = position
    this.dimension = dimension
    this.settings = settings
  }

  init (): void {
    // throw new Error('Implement in subclass.')
  }
}
