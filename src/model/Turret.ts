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
import LegendState from '../application/LegendState'

/**
 * Turret class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Turret extends Entity {
  description: string
  assetId: AssetId
  damage: number
  rate: number
  range: number
  asset
  contextId: ContextId
  projectileSpeed: number
  addProjectileCallback: (position: Vector2, speed: number, damage: number, target: Creep) => void
  state: LegendState
  private delayCounter: number

  constructor (position: Vector2, dimension: Dimension, assetId: AssetId = AssetId.TURRET_LASER) {
    super(position, dimension)
    this.contextId = ContextId.PLAYER
    this.assetId = assetId
    this.delayCounter = 0
    this.type = EntityType.TURRET
  }

  init (): void {
    this.delayCounter = 0
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render (ctx: CanvasRenderingContext2D) {
    if (this.asset) {
      ctx.drawImage(this.asset, this.position.x, this.position.y, this.dimension.width, this.dimension.height)
      ctx.beginPath()
      ctx.arc(
        this.position.x + this.dimension.width / 2,
        this.position.y + this.dimension.height / 2,
        this.range
        , 0,
        2 * Math.PI
      )
      ctx.stroke()
    }
  }

  /**
   *
   * @param {number} dt
   * @param time
   */
  change (dt: number, time: number) {
    this.delayCounter += 1
    if (this.delayCounter >= this.rate) {
      this.delayCounter = 0
      let firstInRange = this.state.creeps.filter(creep => {
        return CollisionHelpers.circleSquareCollision(
          { x: this.position.x, y: this.position.y, r: this.range },
          { x: creep.position.x, y: creep.position.y, width: creep.dimension.width, height: creep.dimension.height }
        )
      })[0]
      if (firstInRange != null && firstInRange.alive) {
        this.shootAt(dt, time, firstInRange)
      }
    }
  }

  /**
   *
   */
  shootAt (dt: number, time: number, target: Creep): void {
    this.addProjectileCallback(
      this.position.clone(),
      this.projectileSpeed,
      this.damage,
      target)
  }
}
