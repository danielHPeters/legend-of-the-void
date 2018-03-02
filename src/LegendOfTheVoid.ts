import IGame from './interfaces/IGame'
import IGameState from './interfaces/IGameState'
import ICollisionManager from './interfaces/ICollisionManager'

/**
 * Main game Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendOfTheVoid implements IGame {
  state: IGameState
  context: CanvasRenderingContext2D
  collisionManager: ICollisionManager

  constructor (state: IGameState, context: CanvasRenderingContext2D) {
    this.state = state
    this.context = context

  }

  init (): void {
  }

  update (dt: number): void {
  }

  render (): void {
  }

}
