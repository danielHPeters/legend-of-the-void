import Entity from "../lib/entity/Entity";
import Vector2 from "../lib/math/Vector2";
import Dimension from "../lib/geometry/Dimension";
import Settings from "../config/Settings";
import IRenderable from "../lib/interfaces/IRenderable";
import { ContextId } from "../enum/ContextId";
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
  public sprite
  public assetID: AssetId
  public contextId: ContextId

  /**
   * Constructor.
   *
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {number} health 
   * @param {Settings} settings 
   */
  constructor (x: number, y: number, width: number, height: number, health: number, name: string, settings: Settings) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.name = name
    this.health = health
    this.contextId = ContextId.PLAYER
  }

  /**
   *  Render the base.
   *
   * @param ctx Rendering context
   */
  public render (ctx: CanvasRenderingContext2D): void {

  }

  /**
   * Clear the frame  
   * @param ctx Rendering context
   */
  public clear (ctx: CanvasRenderingContext2D): void {
    
  }
}
