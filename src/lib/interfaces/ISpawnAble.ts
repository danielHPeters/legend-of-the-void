/**
 * Spawnable objects interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface ISpawnAble {
  alive: boolean

  /**
   * Spawning function.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} speed
   */
  spawn (x: number, y: number, speed: number): void
}
