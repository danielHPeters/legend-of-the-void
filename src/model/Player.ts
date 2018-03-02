/**
 * Player class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Player {
  name: string
  victories: number
  losses: number

  /**
   * Constructor.
   *
   * @param {string} name Player name
   * @param {number} victories Player victories
   * @param {number} losses Player losses
   */
  constructor (name: string, victories: number, losses: number) {
    this.name = name
    this.victories = victories
    this.losses = losses
  }
}
