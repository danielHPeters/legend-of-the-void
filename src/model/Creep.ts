import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'
import { EntityType } from '../enum/EntityType'
import Base from './Base'

/**
 * Enemy creep class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Creep extends Entity {
  contextId: ContextId
  assetId: AssetId
  asset: HTMLImageElement
  name: string
  speed: number
  attack: number
  health: number
  level: number
  cash: number
  wayPoints: Vector2[]
  currentWaypoint: number
  lastTime: number
  base: Base

  constructor (x: number, y: number, width: number, height: number, level: number, cash: number, assetId: AssetId = AssetId.CREEP_VOID_LEECHER) {
    super(new Vector2(x, y), new Dimension(width, height))
    this.contextId = ContextId.CREEPS
    this.level = level
    this.cash = cash
    this.assetId = assetId
    this.wayPoints = []
    this.currentWaypoint = 0
    this.type = EntityType.CREEP
  }

  takeDamage (damage: number): void {
    this.health -= damage
    if (this.health <= 0) {
      this.alive = false
    }
  }

  init (): void {
    // Not implemented.
  }

  change (dt: number, time: number): void {
    if (!this.lastTime) {
      this.lastTime = time
    }
    if (this.alive) {
      const startPosition = this.wayPoints[this.currentWaypoint]
      const endPosition = this.wayPoints[this.currentWaypoint + 1]
      const pathLength = Vector2.distance(startPosition, endPosition)
      const totalTimeForPath = pathLength / this.speed
      const currentTimeOnPath = time - this.lastTime
      this.position = Vector2.lerp(startPosition, endPosition, currentTimeOnPath / totalTimeForPath)
      if (this.position.clone().round().equals(endPosition)) {
        if (this.currentWaypoint < this.wayPoints.length - 2) {
          this.currentWaypoint += 1
          this.lastTime = time
          // TODO: Rotate into move direction
        } else {
          // 3.b
          this.alive = false
          this.base.takeDamage(this.attack)
        }
      }
    }
  }
}
