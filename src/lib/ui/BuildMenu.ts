import GameState from '../application/GameState'
import Turret from '../../model/Turret'
import AssetManager from '../application/AssetManager'
import Tile from '../../model/Tile'
import Point from '../math/Point'

export type TurretCallback = (turret: Turret) => void

/**
 * Build menu for building Towers etc.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class BuildMenu {
  element: HTMLElement
  state: GameState
  turretList: Turret[]
  assetManager: AssetManager
  open: boolean
  tile: Tile | undefined
  callback: TurretCallback

  /**
   * Constructor.
   *
   * @param elementId
   * @param turretList
   * @param assetManager
   * @param addTurretCallback
   */
  constructor (elementId: string, turretList: Turret[], assetManager: AssetManager, addTurretCallback: TurretCallback) {
    this.element = document.createElement('div')
    this.turretList = turretList
    this.assetManager = assetManager
    this.element.id = elementId
    this.open = false
    this.callback = addTurretCallback
  }

  /**
   * Initialize the menu.
   */
  init (): void {
    const title = document.createElement('h4')
    title.textContent = 'Build Turret'
    this.element.appendChild(title)
    this.element.classList.add('build-menu')
    this.turretList.forEach(turret => {
      const turretBox = document.createElement('div')
      const image = this.assetManager.get(turret.assetId)
      const toolTipText = document.createElement('span')
      toolTipText.classList.add('tooltip-text')
      toolTipText.textContent = turret.description
      turretBox.classList.add('build-box')
      turretBox.classList.add('tooltip')
      turretBox.appendChild(image)
      turretBox.appendChild(toolTipText)
      turretBox.addEventListener('click', () => {
        if (this.tile) {
          let turr = new Turret(this.tile.position, this.tile.dimension)
          turr.fromJSON(turret)
          turr.position = this.tile.position
          turr.dimension = this.tile.dimension
          this.callback(turr)
        }
      })
      this.element.appendChild(turretBox)
    })
    document.body.appendChild(this.element)
  }

  getPosition (e: MouseEvent): Point {
    let posx = 0
    let posy = 0

    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft
      posy = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop
    }

    return new Point(posx, posy)
  }

  positionMenu (menuPosition: Point): void {
    let menuPositionX = menuPosition.x + 'px'
    let menuPositionY = menuPosition.y + 'px'

    this.element.style.left = menuPositionX
    this.element.style.top = menuPositionY
  }

  show (tile: Tile): void {
    if (!this.open) {
      this.open = true
      this.element.style.display = 'block'
      this.tile = tile
    }
  }

  hide (): void {
    this.open = false
    this.element.style.display = 'none'
    this.tile = undefined
  }
}
