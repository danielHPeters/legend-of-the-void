import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2';
import Dimension from '../lib/geometry/Dimension';
import Settings from '../config/Settings';
import { DamageType } from '../enum/DamageType';
import IRenderable from '../lib/interfaces/IRenderable';
import IMovable from '../lib/interfaces/IMovable';
import { ContextId } from '../enum/ContextId';

/**
 * Turret class.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity implements IRenderable, IMovable {
  name: string
  description: string
  attack: number
  damageType: DamageType
  fireInteval: number
  currentFrame: number
  sprite
  contextId: ContextId

  /**
   * Constructor.
   * 
   * @param {number} x Starting position on x axis
   * @param {number} y Starting position on y axis
   * @param {number} width Turret width
   * @param {number} height Turret height
   * @param {number} attack Turret attack
   * @param {Settings} settings Game settings.
   */
  constructor (x: number, y: number, width: number, height: number, attack: number, settings: Settings) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.attack = attack
    this.damageType = DamageType.FIRE
    this.contextId = ContextId.PLAYER
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
