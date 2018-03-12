import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2';
import Dimension from '../lib/geometry/Dimension';
import Settings from '../config/Settings';
import { DamageType } from '../enum/DamageType';

/**
 * Turret class.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity {
  name: string
  description: string
  attack: number
  damageType: DamageType
  fireInteval: number
  currentFrame: number
  sprite

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
  }

  fire (): void {

  }
}
