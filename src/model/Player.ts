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
   * @param name Player name
   */
  constructor (name: string) {
    this.name = name
    this.cash = 0
    this.kills = 0
  }

  update (state: any): void {
    if (state.cash) {
      this.cash = state.cash
    }
    if (state.kills) {
      this.kills = state.kills
    }
  }
}
