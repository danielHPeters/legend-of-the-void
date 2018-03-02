import IGameState from './interfaces/IGameState'
import QuadTree from './lib/collision/QuadTree'
import Entity from './model/Entity'
import ICollideAble from './interfaces/ICollideAble'
import InputManager from './client/InputManager'
import GameSettings from './config/GameSettings'

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

  /**
   * Constructor.
   *
   * @param {GameSettings} settings
   * @param {InputManager} inputManager
   */
  constructor (settings: GameSettings, inputManager: InputManager) {
    this.running = false
    this.paused = false
    this.entities = []
    this.collideables = []
  }
}
