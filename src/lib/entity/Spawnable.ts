/**
 * Spawnable objects interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Spawnable {
  alive: boolean

  /**
   * Spawning function.
   *
   * @param x
   * @param y
   * @param speed
   */
  spawn (x: number, y: number, speed: number): void
}
