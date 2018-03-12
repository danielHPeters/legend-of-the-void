import IGameState from './lib/interfaces/IGameState'
import QuadTree from './lib/collision/QuadTree'
import Entity from './lib/entity/Entity'
import ICollideAble from './lib/interfaces/ICollideAble'
import Settings from './config/Settings'
import InputManager from './lib/client/InputManager'
import IRenderable from './lib/interfaces/IRenderable'
import IMovable from './lib/interfaces/IMovable'

/**
 * Legend of the void game state class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendState implements IGameState {
  public running: boolean
  public paused: boolean
  public quadTree: QuadTree
  public entities: Entity[]
  public collideables: ICollideAble[]
  public movables: IMovable[]
  public renderables: IRenderable[]

  /**
   * Constructor.
   *
   * @param {Settings} settings
   * @param {InputManager} inputManager
   */
  constructor (settings: Settings, inputManager: InputManager) {
    this.running = false
    this.paused = false
    this.entities = []
    this.collideables = []
  }

  public update (dt: number): void {
  }

  public reset (): void {
  }

  public scorePoints (): void {
  }
}
