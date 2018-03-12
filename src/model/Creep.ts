import Settings from "../config/Settings";
import Entity from "../lib/entity/Entity";
import Vector2 from "../lib/math/Vector2";
import Dimension from "../lib/geometry/Dimension";
import IRenderable from "../lib/interfaces/IRenderable";
import IMovable from "../lib/interfaces/IMovable";
import { ContextId } from "../enum/ContextId";

/** 
 * Enemy creep class.
 * 
 * @author Daniel Peters
 * @version 1.0
*/
export default class Creep extends Entity implements IRenderable, IMovable {
  speed: number
  sprite
  damage: number
  contextId: ContextId
  
  /**
   * Consctructor.
   * 
   * @param x 
   * @param y 
   * @param width 
   * @param height 
   * @param settings 
   */
  constructor (x: number, y: number, width: number, height: number, settings: Settings) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.contextId = ContextId.CREEPS
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
