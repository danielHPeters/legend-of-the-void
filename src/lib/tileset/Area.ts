import TileSetMap from './TileSetMap'

/**
 * Area with a tileset map.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Area {
  map: TileSetMap

  /**
   * Constructor.
   *
   * @param map
   */
  constructor (map: TileSetMap) {
    this.map = map
  }
}
