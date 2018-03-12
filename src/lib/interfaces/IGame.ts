import IGameState from './IGameState'
import InputManager from '../client/InputManager'
import AssetManager from '../client/AssetManager'

/**
 * Game interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IGame {
  state: IGameState
  inputManager: InputManager
  assetManager: AssetManager

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
