import IGameState from '../lib/interfaces/IGameState'
import IGame from '../lib/interfaces/IGame'
import ICollisionManager from '../lib/interfaces/ICollisionManager'
import InputManager from '../lib/client/InputManager'
import AssetManager, { AssetType } from '../lib/client/AssetManager'
import { ContextId } from '../enum/ContextId'
import Settings from '../config/Settings'
import LegendState from './LegendState'
import AudioManager from '../lib/client/AudioManager'
import CollisionManager from '../lib/collision/CollisionManager'
import * as mapData from '../../public/definitions/maps.json'
import * as turretData from '../../public/definitions/turrets.json'
import Tile from '../model/Tile'
import Turret from '../model/Turret'
import Dimension from '../lib/geometry/Dimension'
import Vector2 from '../lib/math/Vector2'
import { AssetId } from '../enum/AssetId'
import BuildMenu from '../ui/BuildMenu'

/**
 * Main game Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LegendOfTheVoid implements IGame {
  audioManager: AudioManager
  inputManager: InputManager
  assetManager: AssetManager
  collisionManager: ICollisionManager
  state: IGameState
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
    this.collisionManager = new CollisionManager(this.state.quadTree)
    this.contexts = contexts
    this.settings = settings
    this.buildMenu = new BuildMenu('buildMenu', turretData, this.assetManager)
  }

  initMap (): void {
    console.log(mapData)
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
        x += width
      })
      y += height
    })
  }

  /**
   * Initialize the game.
   */
  init (): void {
    this.assetManager.queueDownload(AssetId.TURRET_LASER, AssetType.SPRITE)
    this.initMap()
    this.assetManager.downloadAll(() => {
      //console.log(this.state.renderables)
      this.state.renderables
        .filter(element => {return element.assetId !== AssetId.NONE })
        .forEach(renderable => renderable.asset = this.assetManager.get(renderable.assetId))
      this.state.reset()
      this.buildMenu.init()
    })
  }

  addTurret (type: string, position: Vector2) {
    let turrets = (<any>turretData)
    let turr = new Turret()
    turr.fromJSON(turrets.filter(turret => {return turret.type === type})[0])
    turr.position = position
    turr.dimension = new Dimension(this.TILE_SIZE, this.TILE_SIZE)
    turr.asset = this.assetManager.get(turr.assetId)
    this.state.entities.push(turr)
    this.state.renderables.push(turr)
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
