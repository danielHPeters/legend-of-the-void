import QuadTree from '../collision/QuadTree'
import ICollideAble from './ICollideAble'
import Entity from '../entity/Entity'
import IRenderable from './IRenderable'
import IMovable from './IMovable'

/**
 * Game state interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface IGameState {
  running: boolean
  paused: boolean
  quadTree: QuadTree
  entities: Entity[]
  movables: IMovable[]
  renderables: IRenderable[]
  collideables: ICollideAble[]

  update (dt: number): void

  reset (): void

  scorePoints (): void
}
