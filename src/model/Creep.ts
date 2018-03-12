import Settings from "../config/Settings";
import Entity from "../lib/entity/Entity";
import Vector2 from "../lib/math/Vector2";
import Dimension from "../lib/geometry/Dimension";

/** 
 * Enemy creep class.
 * 
 * @author Daniel Peters
 * @version 1.0
*/
export default class Creep extends Entity {
  speed: number
  sprite
  
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
  }
}
