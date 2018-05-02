import QuadTree from '../collision/QuadTree'
import Collidable from '../collision/Collidable'
import Entity from '../entity/Entity'
import Renderable from '../entity/Renderable'
import Changeable from '../entity/Changeable'
import Tile from '../../model/Tile'

/**
 * Game state interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface GameState {
  running: boolean
  paused: boolean
  quadTree: QuadTree
  entities: Entity[]
  movables: Changeable[]
  renderables: Renderable[]
  collideables: Collidable[]
  map: Tile[]

  update (dt: number): void

  reset (): void

  scorePoints (point: number): void
}
