import GameState from '../lib/application/GameState'
import QuadTree from '../lib/collision/QuadTree'
import Entity from '../lib/entity/Entity'
import Collidable from '../lib/collision/Collidable'
import Settings from '../config/Settings'
import InputManager from '../lib/input/InputManager'
import Renderable from '../lib/entity/Renderable'
import Changeable from '../lib/entity/Changeable'
import Tile from '../model/Tile'
import Observable from '../lib/observer/Observable'
import HitBox from '../lib/collision/HitBox'

/**
 * Legend of the void game state class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendState extends Observable implements GameState {
  public running: boolean
  public paused: boolean
  public quadTree: QuadTree
  public entities: Entity[]
  public collideables: Collidable[]
  public movables: Changeable[]
  public renderables: Renderable[]
  public map: Tile[]

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
    this.quadTree = new QuadTree(new HitBox(0, 0, settings.gameSize.width, settings.gameSize.height))
    this.collideables = []
    this.movables = []
    this.renderables = []
    this.map = []
    this.state = {
      kills: 0,
      cash: 0
    }
  }

  public update (dt: number): void {
    this.movables.forEach(movable => movable.change(dt))
  }

  public reset (): void {
    this.entities.forEach(entity => entity.init())
  }

  public scorePoints (points: number): void {
    this.state.cash += points
    this.state.kills++
    this.notify()
  }
}
