import GameState from '../lib/application/GameState'
import QuadTree from '../lib/collision/QuadTree'
import Entity from '../lib/entity/Entity'
import Settings from '../config/Settings'
import InputManager from '../lib/input/InputManager'
import Tile from '../model/Tile'
import Observable from '../lib/observer/Observable'
import HitBox from '../lib/collision/HitBox'
import Creep from '../model/Creep'

/**
 * Legend of the void game state class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendState extends Observable implements GameState {
  running: boolean
  paused: boolean
  quadTree: QuadTree
  entities: Entity[]
  creeps: Creep[]
  map: Tile[]

  /**
   * Constructor.
   *
   * @param {Settings} settings
   * @param {InputManager} inputManager
   */
  constructor (settings: Settings, inputManager: InputManager) {
    super()
    this.running = false
    this.paused = false
    this.entities = []
    this.creeps = []
    this.quadTree = new QuadTree(new HitBox(0, 0, settings.gameSize.width, settings.gameSize.height))
    this.map = []
    this.state = {
      kills: 0,
      cash: 0
    }
  }

  update (dt: number, time: number): void {
    this.entities.forEach(movable => movable.change(dt, time))
    this.entities = this.entities.filter(entity => { return entity.alive })
    this.creeps = this.creeps.filter(entity => { return entity.alive })
  }

  reset (): void {
    this.entities.forEach(entity => entity.init())
  }

  scorePoints (points: number): void {
    this.state.cash += points
    this.state.kills++
    this.notify()
  }
}
