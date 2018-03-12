import IGameState from "../interfaces/IGameState";
import Turret from "../../model/Turret";

/** 
 * Build menu for building Towers etc.
 * 
 * @author Daniel Peters
 * @version 1.0
*/
export default class BuildMenu {
  element: HTMLElement
  state: IGameState
  turretList: Turret[]

  /**
   * Constructor.
   *
   * @param elementId 
   * @param state 
   * @param turretList 
   */
  constructor (elementId: string, state: IGameState, turretList: Turret[]) {
    this.element = document.getElementById(elementId)
    this.state = state
    this.turretList = turretList
  }

  /**
   * Initialize the menu.
   */
  init (): void {
    this.turretList.forEach(turret => {
      const turretBox = document.createElement('div')
      turretBox.classList.add('build-box')
      turretBox.appendChild(turret.sprite)
      this.element.appendChild(turretBox)
    });
  }
}
