import GameLoop from '../lib/application/GameLoop'
import Game from '../lib/application/Game'

/**
 * Legend of the void game loop class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendLoop implements GameLoop {
  game: Game
  lastTime: number
  frameId: number

  /**
   * Constructor.
   *
   * @param game Game instance
   */
  constructor (game: Game) {
    this.game = game
    this.lastTime = null
  }

  /**
   * Start the game loop.
   */
  start (): void {
    this.game.init()
    this.game.state.running = true
    this.frameId = requestAnimationFrame(this.loop.bind(this))
  }

  /**
   * Stop the game loop.
   */
  stop (): void {
    this.game.state.running = false
    if (this.frameId) {
      cancelAnimationFrame(this.frameId)
    }
  }

  /**
   * Stop the game loop and start it again.
   */
  restart (): void {
    this.stop()
    this.start()
  }

  /**
   * Pause/unpause game.
   */
  togglePause (): void {
    this.game.state.paused = !this.game.state.paused
  }

  /**
   * Main loop executing update and render methods.
   */
  loop (time: number): void {
    if (this.game.state.running) {
      if (!this.game.state.paused) {
        this.game.clear()
        if (this.lastTime !== null) {
          const diff = time - this.lastTime
          this.game.state.update(diff / 1000, time / 1000)
        }
        this.lastTime = time
        this.game.render()
        this.frameId = requestAnimationFrame(this.loop.bind(this))
      }
    }
  }
}
