import Vector2 from '../geometry/Vector2'
import Dimension from '../geometry/Dimension'
import IRenderable from '../interfaces/IRenderable'
import GameSettings from '../config/GameSettings'
import IMovable from '../interfaces/IMovable'

/**
 * Base entity class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity implements IRenderable, IMovable {
  velocity: Vector2
  acceleration: Vector2
  position: Vector2
  dimension: Dimension
  color: string
  settings: GameSettings

  /**
   * Constructor. Sets position and dimension of entity.
   *
   * @param {Vector2} position Initial position
   * @param {Dimension} dimension Initial dimension
   * @param color Color of the entity
   * @param {GameSettings} settings
   */
  constructor (position: Vector2, dimension: Dimension, color: string, settings: GameSettings) {
    this.position = position
    this.dimension = dimension
    this.settings = settings
    this.color = color
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render (ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.left, this.top, this.dimension.width, this.dimension.height)
  }

  /**
   *
   */
  init (): void {
    throw new Error('Implement in subclass.')
  }

  /**
   *
   * @param {number} dt
   */
  move (dt: number): void {
    throw new Error('Implement in subclass.')
  }

  /**
   *
   * @returns {number}
   */
  get left (): number {
    return this.position.x - this.dimension.width / 2
  }

  /**
   *
   * @returns {number}
   */
  get right (): number {
    return this.position.x + this.dimension.width / 2
  }

  /**
   *
   * @returns {number}
   */
  get top (): number {
    return this.position.y - this.dimension.height / 2
  }

  /**
   *
   * @returns {number}
   */
  get bottom (): number {
    return this.position.y + this.dimension.height / 2
  }
}
