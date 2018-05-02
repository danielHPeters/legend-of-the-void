import GameState from './GameState'
import InputManager from '../input/InputManager'
import AssetManager from './AssetManager'
import AudioManager from '../audio/AudioManager'
import SimpleCollisionManager from '../collision/SimpleCollisionManager'

/**
 * Game interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Game {
  audioManager: AudioManager
  inputManager: InputManager
  assetManager: AssetManager
  collisionManager: SimpleCollisionManager
  state: GameState

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
