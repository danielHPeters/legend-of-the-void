import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Settings from '../config/Settings'
import Renderable from '../lib/entity/Renderable'
import Changeable from '../lib/entity/Changeable'
import { ContextId } from '../enum/ContextId'
import { TurretType } from '../enum/TurretType'
import { AssetId } from '../enum/AssetId'

/**
 * Turret class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity implements Renderable, Changeable {
  type: TurretType
  description: string
  assetId: AssetId
  damage: number
  rate: number
  range: number
  asset
  contextId: ContextId

  /**
   * Constructor.
   *
   * @param {number} x Starting position on x axis
   * @param {number} y Starting position on y axis
   * @param {number} width Turret width
   * @param {number} height Turret height
   * @param {number} damage Turret attack
   * @param {Settings} settings Game settings.
   * @param {TurretType} type
   * @param {AssetId} assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number,
               damage?: number, settings?: Settings, type?: TurretType, assetId: AssetId = AssetId.TURRET_LASER) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.type = type
    this.damage = damage
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
  }

  init (): void {
    // Currently no init/reset method intended
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render (ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.asset, this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  clear (ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
  }

  /**
   *
   * @param {number} dt
   */
  change (dt: number) {
    // TODO: implement state update mechanism
  }

  /**
   *
   */
  shoot (): void {
    // TODO: implement shooting
  }
}
