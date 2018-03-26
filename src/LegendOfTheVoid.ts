import IGameState from './lib/interfaces/IGameState'
import IGame from './lib/interfaces/IGame'
import ICollisionManager from './lib/interfaces/ICollisionManager'
import InputManager from './lib/client/InputManager'
import AssetManager from './lib/client/AssetManager'
import { ContextId } from './enum/ContextId';

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
  contexts: Map<ContextId, CanvasRenderingContext2D>
  collisionManager: ICollisionManager

  /**
   * Constructor.
   *
   * @param {IGameState} state
   * @param {Map<ContextId, CanvasRenderingContext2D>} context
   */
  constructor (state: IGameState, contexts: Map<ContextId, CanvasRenderingContext2D>) {
    this.state = state
    this.contexts = contexts
  }

  /**
   * Initialize the game.
   */
  public init (): void {
    this.state.reset()
  }

  /**
   * Render current state.
   */
  public render (): void {
    this.state.renderables.forEach(renderable => renderable.render(this.contexts.get(renderable.contextId)))
  }

  /**
   *
   */
  public clear (): void {
    this.state.renderables.forEach(renderable => renderable.clear(this.contexts.get(renderable.contextId)))
  }
}
