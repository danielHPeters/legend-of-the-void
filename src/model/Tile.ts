import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Turret from './Turret'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'
import { EntityType } from '../enum/EntityType'

/**
 * 2D Tower defense tile class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Tile extends Entity {
  contextId: ContextId
  assetId: AssetId
  asset: HTMLImageElement
  blocked: boolean
  buildable: boolean
  turret: Turret
  color: string

  constructor (x: number, y: number, width: number, height: number) {
    super(new Vector2(x, y), new Dimension(width, height))
    this.color = '#ffffff'
    this.contextId = ContextId.BACKGROUND
    this.assetId = AssetId.NONE
    this.type = EntityType.TILE
  }

  init (): void {
    // Not implemented.
  }
}
