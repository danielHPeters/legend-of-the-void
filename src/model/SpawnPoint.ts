import Entity from '../lib/entity/Entity'
import Dimension from '../lib/geometry/Dimension'
import Vector2 from '../lib/math/Vector2'
import Creep from './Creep'
import * as creepData from '../../public/definitions/creeps.json'
import AssetManager from '../lib/application/AssetManager'

/**
 * SpawnPoint class used to spawn enemy creeps.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SpawnPoint extends Entity {
  spawnRate: number
  counter: number
  assetManager: AssetManager
  wayPoints: Vector2[]
  spawnCallback: (creep: Creep) => void

  constructor (x: number, y: number, width: number, height: number, assetManager: AssetManager, wayPoints: Vector2[], spawnCallback: (creep: Creep) => void) {
    super(new Vector2(x, y), new Dimension(width, height))
    this.counter = 0
    this.assetManager = assetManager
    this.wayPoints = wayPoints
    this.spawnCallback = spawnCallback
    this.spawnRate = 200
  }

  init () {
    // Not implemented.
  }

  change (dt: number, time: number): void {
    this.counter += 1

    if (this.counter >= this.spawnRate) {
      this.counter = 0
      const creep = new Creep(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
      creep.fromJSON(creepData[0])
      creep.wayPoints = this.wayPoints
      creep.asset = this.assetManager.get(creep.assetId)
      creep.alive = true
      this.spawnCallback(creep)
    }
  }

  render (ctx: CanvasRenderingContext2D): void {
    // Do nothing
  }

  clear (ctx: CanvasRenderingContext2D): void {
    // Do nothing
  }
}
