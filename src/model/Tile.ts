import Entity from '../lib/entity/Entity'
import Settings from '../config/Settings'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Turret from './Turret';

/** 
 * 2D Tower defense tile class.
 * 
 * @author Daniel Peters
 * @version 1.0
*/
export default class Tile extends Entity {
  blocked: boolean
  buildable: boolean
  turret: Turret

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
  }

  public init (): void {
    
  }
}
