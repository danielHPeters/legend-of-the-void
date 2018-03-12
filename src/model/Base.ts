import Entity from "../lib/entity/Entity";
import Vector2 from "../lib/math/Vector2";
import Dimension from "../lib/geometry/Dimension";
import Settings from "../config/Settings";

/**
 * The base a player needs to defend.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class Base extends Entity {
  private health: number

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
  constructor (x: number, y: number, width: number, height: number, health: number, settings: Settings) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.health = health
  }
}