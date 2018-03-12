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
   * @param {TileSetMap} map
   */
  constructor (map: TileSetMap) {
    this.map = map
  }
}
