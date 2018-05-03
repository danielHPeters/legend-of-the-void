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
import Tile from '../model/Tile'
import { AssetId } from '../enum/AssetId'
import BuildMenu from '../lib/ui/BuildMenu'
import Base from '../model/Base'
import Creep from '../model/Creep'
import * as mapData from '../../public/definitions/maps.json'
import * as turretData from '../../public/definitions/turrets.json'
import * as baseData from '../../public/definitions/bases.json'
import * as creepData from '../../public/definitions/creeps.json'
import Vector2 from '../lib/math/Vector2'

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
    let creep
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
            tile.assetId = AssetId.WALL
            break
          case 1:
            tile.buildable = true
            tile.assetId = AssetId.TURRET_SOCKET
            break
          case 2:
            tile.assetId = AssetId.PATH
            break
          case 3:
            creep = new Creep(x, y, width, height)
            const waypoints = []
            waypoints.push(tile.position)
            waypoints.push(new Vector2(60, 180))
            waypoints.push(new Vector2(60, 120))
            waypoints.push(new Vector2(540, 120))
            waypoints.push(new Vector2(540, 240))
            waypoints.push(new Vector2(180, 240))
            waypoints.push(new Vector2(180, 300))
            waypoints.push(new Vector2(60, 300))
            waypoints.push(new Vector2(60, 420))
            waypoints.push(new Vector2(300, 420))
            waypoints.push(new Vector2(300, 360))
            waypoints.push(new Vector2(540, 360))
            waypoints.push(new Vector2(540, 480))
            waypoints.push(new Vector2(420, 480))
            waypoints.push(new Vector2(420, 540))
            waypoints.push(new Vector2(0, 460))
            creep.fromJSON(creepData[0])
            creep.waypoints = waypoints
            tile.assetId = AssetId.END
            break
          case 4:
            const base = new Base(x, y, width, height)
            base.fromJSON(baseData[0])
            this.state.entities.push(base)
            this.state.renderables.push(base)
            tile.assetId = AssetId.END
            break
        }
        this.state.entities.push(tile)
        this.state.renderables.push(tile)
        this.state.map.push(tile)
        x += width
      })
      y += height
    })
    creep.alive = true
    this.state.entities.push(creep)
    this.state.renderables.push(creep)
    this.state.changeables.push(creep)
  }

  initBuildMenu () {
    document.addEventListener('click', ev => {
      ev.preventDefault()
      let position = this.buildMenu.getPosition(ev)
      let tile = this.state.map.filter(tile => tile.within(position.x, position.y))[0]
      if (tile && tile.buildable && !this.buildMenu.open) {
        this.buildMenu.show(tile)
        this.buildMenu.positionMenu(position)
      } else {
        this.buildMenu.hide()
      }
    })
  }

  /**
   * Initialize the game.
   */
  init (): void {
    this.assetManager.queueDownload(AssetId.BASE_VOID)
    this.assetManager.queueDownload(AssetId.TURRET_LASER)
    this.assetManager.queueDownload(AssetId.TURRET_SOCKET)
    this.assetManager.queueDownload(AssetId.PATH)
    this.assetManager.queueDownload(AssetId.WALL)
    this.assetManager.queueDownload(AssetId.END)
    this.assetManager.queueDownload(AssetId.CREEP_VOID_LEECHER)
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
