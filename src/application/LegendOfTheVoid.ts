import GameState from '../lib/application/GameState'
import Game from '../lib/application/Game'
import CollisionManager from '../lib/collision/CollisionManager'
import InputManager from '../lib/input/InputManager'
import AssetManager, { AssetType } from '../lib/application/AssetManager'
import { ContextId } from '../enum/ContextId'
import Settings from '../config/Settings'
import LegendState from './LegendState'
import AudioManager from '../lib/audio/AudioManager'
import SimpleCollisionManager from '../lib/collision/SimpleCollisionManager'
import * as mapData from '../../public/definitions/maps.json'
import * as turretData from '../../public/definitions/turrets.json'
import Tile from '../model/Tile'
import { AssetId } from '../enum/AssetId'
import BuildMenu from '../lib/ui/BuildMenu'

/**
 * Main game Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendOfTheVoid implements Game {
  audioManager: AudioManager
  inputManager: InputManager
  assetManager: AssetManager
  collisionManager: CollisionManager
  state: GameState
  contexts: Map<ContextId, CanvasRenderingContext2D>
  settings: Settings
  buildMenu: BuildMenu
  private TILE_SIZE = 60

  /**
   * Constructor.
   *
   * @param {Map<ContextId, CanvasRenderingContext2D>} contexts
   * @param {Settings} settings
   */
  constructor (contexts: Map<ContextId, CanvasRenderingContext2D>, settings: Settings) {
    this.audioManager = new AudioManager()
    this.inputManager = new InputManager(settings)
    this.assetManager = new AssetManager(this.audioManager)
    this.state = new LegendState(settings, this.inputManager)
    this.collisionManager = new SimpleCollisionManager(this.state.quadTree)
    this.contexts = contexts
    this.settings = settings
    this.buildMenu = new BuildMenu('build-menu', turretData, this.assetManager, turret => {
      turret.asset = this.assetManager.get(turret.assetId)
      this.state.entities.push(turret)
      this.state.renderables.push(turret)
    })
  }

  initMap (): void {
    let y = 0
    mapData[0].tiles.forEach(row => {
      let width = this.TILE_SIZE
      let height = this.TILE_SIZE
      let x = 0
      row.forEach(col => {
        const tile = new Tile(x, y, width, height, this.settings)
        switch (col) {
          case 0:
            tile.blocked = true
            tile.color = '#000000'
            break
          case 1:
            tile.buildable = true
            tile.color = '#ff00ff'
            break
          case 3:
            tile.color = '#00ff00'
            break
          case 4:
            tile.color = '#ff0000'
            break
        }
        this.state.entities.push(tile)
        this.state.renderables.push(tile)
        this.state.map.push(tile)
        x += width
      })
      y += height
    })
  }

  initBuildMenu () {
    document.addEventListener('contextmenu', ev => {
      ev.preventDefault()
      let position = this.buildMenu.getPosition(ev)
      let tile = this.state.map.filter(tile => tile.within(position.x, position.y))[0]
      if (tile.buildable) {
        this.buildMenu.show(tile)
        this.buildMenu.positionMenu(position)
      } else {
        this.buildMenu.hide()
      }
    })
    document.addEventListener('click', () => this.buildMenu.hide())
  }

  /**
   * Initialize the game.
   */
  init (): void {
    this.assetManager.queueDownload(AssetId.TURRET_LASER, AssetType.SPRITE)
    this.initMap()
    this.initBuildMenu()
    this.assetManager.downloadAll(() => {
      this.state.renderables
        .filter(element => { return element.assetId !== AssetId.NONE })
        .forEach(renderable => renderable.asset = this.assetManager.get(renderable.assetId))
      this.state.reset()
      this.buildMenu.init()
    })
  }

  /**
   * Render current state.
   */
  render (): void {
    this.state.renderables.forEach(renderable => renderable.render(this.contexts.get(renderable.contextId)))
  }

  /**
   *
   */
  clear (): void {
    this.state.renderables.forEach(renderable => renderable.clear(this.contexts.get(renderable.contextId)))
  }
}
