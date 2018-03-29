import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Settings from '../config/Settings'
import IRenderable from '../lib/interfaces/IRenderable'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'

/**
 * The base a player needs to defend.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Base extends Entity implements IRenderable {
  public name: string
  public health: number
  public asset
  public assetId: AssetId
  public contextId: ContextId

  /**
   * Constructor.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} health
   * @param {string} name
   * @param {Settings} settings
   * @param {AssetId} assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number, health?: number, name?: string, settings?: Settings, assetId: AssetId = AssetId.BASE_VOID) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.name = name
    this.health = health
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
  }

  public init (): void {

  }

  /**
   *  Render the base.
   *
   * @param ctx Rendering context
   */
  public render (ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.asset, this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }

  /**
   * Clear the frame
   * @param ctx Rendering context
   */
  public clear (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }
}
