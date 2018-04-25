import IGameState from '../lib/interfaces/IGameState'
import QuadTree from '../lib/collision/QuadTree'
import Entity from '../lib/entity/Entity'
import ICollideAble from '../lib/interfaces/ICollideAble'
import Settings from '../config/Settings'
import InputManager from '../lib/client/InputManager'
import IRenderable from '../lib/interfaces/IRenderable'
import IMovable from '../lib/interfaces/IMovable'
import Tile from '../model/Tile'
import Observable from '../lib/observer/Observable'
import HitBox from '../lib/collision/HitBox'

/**
 * Legend of the void game state class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendState extends Observable implements IGameState {
  public running: boolean
  public paused: boolean
  public quadTree: QuadTree
  public entities: Entity[]
  public collideables: ICollideAble[]
  public movables: IMovable[]
  public renderables: IRenderable[]
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
    this.state = {
      kills: 0,
      cash: 0
    }
  }

  public update (dt: number): void {
    this.movables.forEach(movable => movable.move(dt))
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
