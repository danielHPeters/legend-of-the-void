import Settings from '../config/Settings'
import Entity from '../lib/entity/Entity'
import Vector2 from '../lib/math/Vector2'
import Dimension from '../lib/geometry/Dimension'
import Renderable from '../lib/entity/Renderable'
import Changeable from '../lib/entity/Changeable'
import { ContextId } from '../enum/ContextId'
import { AssetId } from '../enum/AssetId'
import Spawnable from '../lib/entity/Spawnable'

/**
 * Enemy creep class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Creep extends Entity implements Renderable, Changeable, Spawnable {
  contextId: ContextId
  assetId: AssetId
  asset
  name: string
  speed: number
  attack: number
  health: number
  level: number
  cash: number
  waypoints: Vector2[]
  currentWaypoint: number
  lastTime: number
  alive: boolean

  /**
   * Constructor.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} level
   * @param {number} cash
   * @param {Settings} settings
   * @param {AssetId} assetId
   */
  constructor (x?: number, y?: number, width?: number, height?: number, level?: number, cash?: number, settings?: Settings, assetId: AssetId = AssetId.CREEP_VOID_LEECHER) {
    super(new Vector2(x, y), new Dimension(width, height), settings)
    this.contextId = ContextId.CREEPS
    this.level = level
    this.cash = cash
    this.assetId = assetId
    this.alive = false
    this.waypoints = []
    this.currentWaypoint = 0
    this.lastTime = 0
  }

  init (): void {
    //
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render (ctx: CanvasRenderingContext2D) {
    if (this.asset) {
      ctx.drawImage(this.asset, Math.floor(this.position.x), Math.floor(this.position.y), this.dimension.width, this.dimension.height)
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  clear (ctx: CanvasRenderingContext2D) {
    ctx.clearRect(Math.floor(this.position.x), Math.floor(this.position.y), this.dimension.width, this.dimension.height)
  }

  change (dt: number, time: number) {
    if (this.alive) {
      const startPosition = this.waypoints[this.currentWaypoint]
      const endPosition = this.waypoints[this.currentWaypoint + 1]
      const pathLength = Vector2.distance(startPosition, endPosition)
      const totalTimeForPath = pathLength / this.speed
      const currentTimeOnPath = time - this.lastTime
      this.position = Vector2.lerp(startPosition, endPosition, currentTimeOnPath / totalTimeForPath)
      if (this.position.clone().round().equals(endPosition)) {
        if (this.currentWaypoint < this.waypoints.length - 2) {
          this.currentWaypoint += 1
          this.lastTime = time
          // TODO: Rotate into move direction
        } else {
          // 3.b
          this.alive = false
          // TODO: deduct health
        }
      }
    }
  }

  spawn (x: number, y: number, speed: number): void {
    this.position.set(x, y)
    this.speed = speed
    this.alive = true
  }
}
