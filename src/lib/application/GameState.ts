import QuadTree from '../collision/QuadTree'
import Entity from '../entity/Entity'
import Tile from '../../model/Tile'
import Creep from '../../model/Creep'
import Base from '../../model/Base'

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
  creeps: Creep[]
  base: Base
  map: Tile[]

  update (dt: number, time: number): void

  reset (): void

  scorePoints (point: number): void
}
