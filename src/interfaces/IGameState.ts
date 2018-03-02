import Entity from '../model/Entity'
import QuadTree from '../lib/collision/QuadTree'
import ICollideAble from './ICollideAble'

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
  collideables: ICollideAble[]
}
