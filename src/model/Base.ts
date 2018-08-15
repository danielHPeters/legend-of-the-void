import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'
import { EntityType } from '../enum/EntityType'

/**
 * The base a player needs to defend.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Base extends Entity {
  contextId: ContextId
  assetId: AssetId
  asset
  name: string
  health: number
  healthDisplay: HTMLElement

  /**
   * Constructor.
   *
   * @param x
   * @param y
   * @param width
   * @param height
   * @param health
   * @param name
   * @param assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number, health?: number, name?: string, assetId: AssetId = AssetId.BASE_VOID) {
    super(new Vector2(x, y), new Dimension(width, height))
    this.name = name
    this.health = health
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
    this.healthDisplay = document.createElement('p')
    this.healthDisplay.id = 'playerHealth'
    this.type = EntityType.BASE
    document.body.appendChild(this.healthDisplay)
  }

  displayHealth (): void {
    if (this.health > 0) {
      this.healthDisplay.textContent = 'Player Health: ' + this.health.toString()
    } else {
      this.healthDisplay.textContent = 'Game Over!'
    }
  }

  /**
   * Load data into this object from JSON.
   *
   * @param json JSON string
   */
  fromJSON (json: any): void {
    // Map parsed object to the attributes of this entity.
    Object.keys(json).forEach(key => {
      this[key] = json[key]
    })
    this.displayHealth()
  }

  /**
   * Base takes damage by amount of param.
   * @param damage
   */
  takeDamage (damage: number): void {
    this.health -= damage
    this.displayHealth()

    if (this.health <= 0) {
      this.alive = false
    }
  }

  init (): void {
    // Not implemented
  }
}
