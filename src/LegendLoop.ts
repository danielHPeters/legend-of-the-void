import IGameLoop from './interfaces/IGameLoop'
import IGame from './interfaces/IGame'

/**
 * Legend of the void game loop class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendLoop implements IGameLoop {
  public game: IGame
  public lastTime: number
  public frameId: number

  /**
   * Constructor.
   *
   * @param {IGame} game Game instance
   */
  constructor (game: IGame) {
    this.game = game
    this.lastTime = null
  }

  /**
   * Start the game loop.
   */
  public start (): void {
    this.game.init()
    this.game.state.running = true
    this.frameId = requestAnimationFrame(this.loop.bind(this))
  }

  /**
   * Stop the game loop.
   */
  public stop (): void {
    this.game.state.running = false
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
    }
  }

  /**
   * Stop the game loop and start it again.
   */
  public restart (): void {
    this.stop()
    this.start()
  }

  /**
   * Pause/unpause game.
   */
  public togglePause (): void {
    this.game.state.paused = !this.game.state.paused
  }

  /**
   * Main loop executing update and render methods.
   */
  public loop (time: number): void {
    if (this.game.state.running) {
      if (!this.game.state.paused) {
        if (this.lastTime !== null) {
          const diff = time - this.lastTime
          this.game.update(diff / 1000)
        }
        this.lastTime = time
        this.game.render()
        this.frameId = requestAnimationFrame(this.loop.bind(this))
      }
    }
  }
}
