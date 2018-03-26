import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Settings from '../config/Settings'
import IRenderable from '../lib/interfaces/IRenderable'
import IMovable from '../lib/interfaces/IMovable'
import { ContextId } from '../enum/ContextId'
import { TurretType } from '../enum/TurretType'
import { AssetId } from '../enum/AssetId'

/**
 * Turret class.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity implements IRenderable, IMovable {
  type: TurretType
  description: string
  spriteId: AssetId
  damage: number
  rate: number
  range: number
  sprite
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
   */
  constructor (x?: number, y?: number, width?: number, height?: number, damage?: number, settings?: Settings, type?: TurretType) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.type = type
    this.damage = damage
    this.contextId = ContextId.PLAYER
  }

  public init (): void {
    
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  public render (ctx: CanvasRenderingContext2D) {

  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  public clear (ctx: CanvasRenderingContext2D) {
    
  }

  /**
   * 
   * @param {number} dt 
   */
  public move (dt: number) {

  }

  /**
   *
   */
  private shoot (): void {

  }
}
