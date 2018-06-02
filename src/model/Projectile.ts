import Entity from '../lib/entity/Entity'
import { AssetId } from '../enum/AssetId'
import { ContextId } from '../enum/ContextId'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Creep from './Creep'
import { EntityType } from '../enum/EntityType'

export default class Projectile extends Entity {
  asset
  assetId: AssetId
  contextId: ContextId
  target: Creep
  startPosition: Vector2
  endPosition: Vector2
  distance: number
  speed: number
  damage: number
  lastTime: number

  constructor (position: Vector2, dimension: Dimension, target: Creep, speed: number, damage: number) {
    super(position, dimension)
    this.target = target
    this.startPosition = position.clone().round()
    this.endPosition = target.position.clone().round()
    this.distance = Vector2.distance(this.startPosition, this.endPosition)
    this.speed = speed
    this.assetId = AssetId.PROJECTILE
    this.type = EntityType.PROJECTILE
    this.contextId = ContextId.PLAYER
    this.damage = damage
  }

  init () {
    // Not implemented.
  }

  change (dt: number, time: number): void {
    if (!this.lastTime) {
      this.lastTime = time
    }
    if (this.alive) {
      const totalTimeForPath = this.distance / this.speed
      const currentTimeOnPath = time - this.lastTime
      this.position = Vector2.lerp(this.startPosition, this.endPosition, currentTimeOnPath / totalTimeForPath)

      const currentPosition = this.position.clone().round()
      if (currentPosition.equals(this.endPosition)) {
        this.alive = false
        if (this.target.within(currentPosition.x, currentPosition.y)) {
          this.target.takeDamage(this.damage)
        }
      }
    }
  }
}
