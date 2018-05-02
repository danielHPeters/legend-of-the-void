import Observer from '../lib/observer/Observer'

/**
 * Player class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Player implements Observer {
  name: string
  cash: number
  kills: number

  /**
   * Constructor.
   *
   * @param {string} name Player nam
   */
  constructor (name: string) {
    this.name = name
    this.cash = 0
    this.kills = 0
  }

  public update (state: any): void {
    if (state.cash) {
      this.cash = state.cash
    }
    if (state.kills) {
      this.kills = state.kills
    }
  }
}
