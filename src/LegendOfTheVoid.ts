import IGameState from './lib/interfaces/IGameState'
import IGame from './lib/interfaces/IGame'
import ICollisionManager from './lib/interfaces/ICollisionManager'
import InputManager from './lib/client/InputManager'
import AssetManager from './lib/client/AssetManager'

/**
 * Main game Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendOfTheVoid implements IGame {
  inputManager: InputManager
  assetManager: AssetManager
  state: IGameState
  context: CanvasRenderingContext2D
  collisionManager: ICollisionManager

  /**
   * Constructor.
   *
   * @param {IGameState} state
   * @param {CanvasRenderingContext2D} context
   */
  constructor (state: IGameState, context: CanvasRenderingContext2D) {
    this.state = state
    this.context = context
  }

  /**
   * Initialize the game.
   */
  public init (): void {
  }

  /**
   * Render current state.
   */
  public render (): void {
  }

  /**
   *
   */
  public clear (): void {
  }
}
