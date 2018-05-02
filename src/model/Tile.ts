import Entity from '../lib/entity/Entity'
import Settings from '../config/Settings'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Turret from './Turret'
import Renderable from '../lib/entity/Renderable'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'

/**
 * 2D Tower defense tile class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Tile extends Entity implements Renderable {
  contextId: ContextId
  assetId: AssetId
  asset
  blocked: boolean
  buildable: boolean
  turret: Turret
  color: string

  /**
   * Conscrutor.
   *
   * @param x
   * @param y
   * @param width
   * @param height
   * @param settings
   */
  constructor (x: number, y: number, width: number, height: number, settings: Settings) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.color = '#ffffff'
    this.contextId = ContextId.BACKGROUND
    this.assetId = AssetId.NONE
  }

  init (): void {
    // Not implemented
  }

  render (ctx: CanvasRenderingContext2D): void {
    if (this.asset) {
      ctx.drawImage(this.asset, this.position.x, this.position.y, this.dimension.width, this.dimension.height)
    }
  }

  clear (ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }
}
