import IGameState from './IGameState'
import ICollisionManager from './ICollisionManager'

/**
 * Game interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IGame {
  /**
   *
   */
  state: IGameState

  collisionManager: ICollisionManager

  /**
   *
   */
  init (): void

  /**
   *
   * @param {number} dt
   */
  update (dt: number): void

  /**
   *
   */
  render (): void
}
