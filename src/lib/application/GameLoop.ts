import Game from './Game'

/**
 * Game Loop interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface GameLoop {
  game: Game
  lastTime: number
  frameId: number

  /**
   * Start the loop.
   */
  start (): void

  /**
   * Stop the loop.
   */
  stop (): void

  /**
   * Restart the loop.
   */
  restart (): void

  /**
   * Toggle pause state.
   */
  togglePause (): void

  /**
   * Main Loop.
   *
   * @param time
   */
  loop (time: number): void
}
