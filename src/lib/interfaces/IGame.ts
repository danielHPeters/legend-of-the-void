import IGameState from './IGameState'
import InputManager from '../client/InputManager'
import AssetManager from '../client/AssetManager'
import AudioManager from '../client/AudioManager'
import CollisionManager from '../collision/CollisionManager'

/**
 * Game interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IGame {
  audioManager: AudioManager
  inputManager: InputManager
  assetManager: AssetManager
  collisionManager: CollisionManager
  state: IGameState

  /**
   *
   */
  init (): void

  /**
   *
   */
  clear (): void

  /**
   *
   */
  render (): void
}
