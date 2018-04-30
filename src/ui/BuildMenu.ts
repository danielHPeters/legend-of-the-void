import IGameState from '../lib/interfaces/IGameState'
import Turret from '../model/Turret'
import AssetManager from '../lib/client/AssetManager'

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
  assetManager: AssetManager

  /**
   * Constructor.
   *
   * @param {string} elementId
   * @param {Turret[]} turretList
   * @param assetManager
   */
  constructor (elementId: string, turretList, assetManager: AssetManager) {
    this.element = document.getElementById(elementId)
    this.turretList = turretList
    this.assetManager = assetManager
  }

  /**
   * Initialize the menu.
   */
  init (): void {
    this.turretList.forEach(turret => {
      const turretBox = document.createElement('div')
      turretBox.classList.add('build-box')
      turretBox.appendChild(this.assetManager.get(turret.assetId))
      turretBox.addEventListener('click', () => {})
      this.element.appendChild(turretBox)
    })
  }
}
