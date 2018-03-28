import IGameState from './lib/interfaces/IGameState'
import IGame from './lib/interfaces/IGame'
import ICollisionManager from './lib/interfaces/ICollisionManager'
import InputManager from './lib/client/InputManager'
import AssetManager from './lib/client/AssetManager'
import { ContextId } from './enum/ContextId'
import Settings from './config/Settings'
import LegendState from './LegendState'
import AudioManager from './lib/client/AudioManager'
import CollisionManager from './lib/collision/CollisionManager'

/**
 * Main game Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendOfTheVoid implements IGame {
  audioManager: AudioManager
  inputManager: InputManager
  assetManager: AssetManager
  collisionManager: ICollisionManager
  state: IGameState
  contexts: Map<ContextId, CanvasRenderingContext2D>

  /**
   * Constructor.
   *
   * @param {Map<ContextId, CanvasRenderingContext2D>} contexts
   * @param {Settings} settings
   */
  constructor (contexts: Map<ContextId, CanvasRenderingContext2D>, settings: Settings) {
    this.audioManager = new AudioManager()
    this.inputManager = new InputManager(settings)
    this.assetManager = new AssetManager(this.audioManager)
    this.collisionManager = new CollisionManager(this.state.quadTree)
    this.state = new LegendState(settings, this.inputManager)
    this.contexts = contexts
  }

  /**
   * Initialize the game.
   */
  public init (): void {
    this.assetManager.downloadAll(() => {
      this.state.renderables.forEach(renderable => renderable.asset = this.assetManager.get(renderable.assetId))
      this.state.reset()
    })
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
