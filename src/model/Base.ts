import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Settings from '../config/Settings'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'

/**
 * The base a player needs to defend.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Base extends Entity {
  contextId: ContextId
  assetId: AssetId
  asset
  name: string
  health: number

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
  constructor (x?: number, y?: number, width?: number, height?: number, health?: number, name?: string, assetId: AssetId = AssetId.BASE_VOID) {
    super(new Vector2(x, y), new Dimension(width, height))
    this.name = name
    this.health = health
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
  }

  init (): void {
    // Not implemented
  }
}
