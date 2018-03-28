import Settings from '../config/Settings'
import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import IRenderable from '../lib/interfaces/IRenderable'
import IMovable from '../lib/interfaces/IMovable'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'

/** 
 * Enemy creep class.
 * 
 * @author Daniel Peters
 * @version 1.0
*/
export default class Creep extends Entity implements IRenderable, IMovable {
  name: string
  speed: number
  attack: number
  health: number
  level: number
  cash: number
  asset
  assetId: AssetId
  contextId: ContextId

  /**
   * Constructor.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} level
   * @param {number} cash
   * @param {Settings} settings
   * @param {AssetId} assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number, level?: number, cash?: number, settings?: Settings, assetId: AssetId = AssetId.CREEP_VOID_LEECHER) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.contextId = ContextId.CREEPS
    this.level = level
    this.cash = cash
    this.assetId = assetId
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
}
