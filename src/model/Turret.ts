import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Settings from '../config/Settings'
import { ContextId } from '../enum/ContextId'
import { TurretType } from '../enum/TurretType'
import { AssetId } from '../enum/AssetId'
import CollisionHelpers from '../lib/collision/CollisionHelpers'
import Creep from './Creep'
import { EntityType } from '../enum/EntityType'

/**
 * Turret class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity {
  turretType: TurretType
  description: string
  assetId: AssetId
  damage: number
  rate: number
  range: number
  asset
  contextId: ContextId
  projectileSpeed: number
  addProjectileCallback: (position: Vector2, speed: number, target: Creep) => void
  private creeps: Creep[]
  private delayCounter: number

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
   * @param {AssetId} assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number,
               damage?: number, settings?: Settings, type?: TurretType, assetId: AssetId = AssetId.TURRET_LASER) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.turretType = type
    this.damage = damage
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
    this.delayCounter = 0
    this.creeps = []
    this.type = EntityType.TURRET
  }

  init (): void {
    this.delayCounter = 0
  }

  /**
   *
   * @param {number} dt
   * @param time
   */
  change (dt: number, time: number) {
    this.delayCounter += 1
    if (this.delayCounter >= this.rate) {
      let firstInRange = this.creeps.filter(creep => {
        return CollisionHelpers.circleSquareCollision(
          { x: this.position.x, y: this.position.y, r: this.range },
          { x: creep.position.x, y: creep.position.y, width: creep.dimension.width, height: creep.dimension.height }
        )
      })[0]
      if (firstInRange != null) {
        this.shootAt(dt, time, firstInRange)
      }
    }
  }

  /**
   *
   */
  shootAt (dt: number, time: number, target: Creep): void {
    this.addProjectileCallback(
      new Vector2(
        this.position.x + this.dimension.width / 2,
        this.position.y + this.dimension.height / 2
        ),
      this.projectileSpeed,
      target)
  }
}
