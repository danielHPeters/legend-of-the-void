import GameState from '../lib/application/GameState'
import Game from '../lib/application/Game'
import CollisionManager from '../lib/collision/CollisionManager'
import InputManager from '../lib/input/InputManager'
import AssetManager from '../lib/application/AssetManager'
import { ContextId } from '../enum/ContextId'
import Settings from '../config/Settings'
import LegendState from './LegendState'
import AudioManager from '../lib/audio/AudioManager'
import SimpleCollisionManager from '../lib/collision/SimpleCollisionManager'
import Tile from '../model/Tile'
import { AssetId } from '../enum/AssetId'
import BuildMenu from '../lib/ui/BuildMenu'
import Base from '../model/Base'
import * as mapData from '../../public/definitions/maps.json'
import * as turretData from '../../public/definitions/turrets.json'
import * as baseData from '../../public/definitions/bases.json'
import Vector2 from '../lib/math/Vector2'
import Projectile from '../model/Projectile'
import Dimension from '../lib/geometry/Dimension'
import SpawnPoint from '../model/SpawnPoint'
import Turret from '../model/Turret'

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
   * @param contexts
   * @param settings
   */
  constructor (contexts: Map<ContextId, CanvasRenderingContext2D>, settings: Settings) {
    this.audioManager = new AudioManager()
    this.inputManager = new InputManager(settings)
    this.assetManager = new AssetManager(this.audioManager)
    this.state = new LegendState(settings, this.inputManager)
    this.collisionManager = new SimpleCollisionManager(this.state.quadTree)
    this.contexts = contexts
    this.settings = settings
    // @ts-ignore
    this.buildMenu = new BuildMenu('build-menu', turretData, this.assetManager, (turret: Turret) => {
      turret.asset = this.assetManager.get(turret.assetId)
      turret.state = this.state
      turret.addProjectileCallback = (position, speed, damage, target) => {
        const projectile = new Projectile(
          position,
          new Dimension(this.TILE_SIZE, this.TILE_SIZE),
          target,
          speed,
          damage
        )
        projectile.asset = this.assetManager.get(projectile.assetId)
        this.state.entities.push(projectile)
      }
      this.state.entities.push(turret)
    })
  }

  initMap (): void {
    let y = 0
    mapData[0].tiles.forEach((row: number[]) => {
      let width = this.TILE_SIZE
      let height = this.TILE_SIZE
      let x = 0
      row.forEach(col => {
        const tile = new Tile(x, y, width, height)
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
            waypoints.push(new Vector2(0, 540))
            const spawnPoint = new SpawnPoint(x, y, width, height, this.assetManager, waypoints, (creep => {
              creep.base = this.state.base
              this.state.entities.push(creep)
              this.state.creeps.push(creep)
            }))
            this.state.entities.push(spawnPoint)
            tile.assetId = AssetId.END
            break
          case 4:
            const base = new Base(x, y, width, height, baseData[0].health, baseData[0].name, baseData[0].assetId)

            this.state.base = base
            this.state.entities.push(base)
            tile.assetId = AssetId.END
            break
        }
        this.state.entities.push(tile)
        this.state.map.push(tile)
        x += width
      })
      y += height
    })
  }

  initBuildMenu (): void {
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
    this.assetManager.queueDownload(AssetId.TURRET_BOMB)
    this.assetManager.queueDownload(AssetId.TURRET_ORB)
    this.assetManager.queueDownload(AssetId.TURRET_SOCKET)
    this.assetManager.queueDownload(AssetId.PATH)
    this.assetManager.queueDownload(AssetId.WALL)
    this.assetManager.queueDownload(AssetId.END)
    this.assetManager.queueDownload(AssetId.CREEP_VOID_LEECHER)
    this.assetManager.queueDownload(AssetId.PROJECTILE)
    this.initMap()
    this.initBuildMenu()
    this.assetManager.downloadAll(() => {
      this.state.entities.forEach(renderable => renderable.asset = this.assetManager.get(renderable.assetId))
      this.state.reset()
      this.buildMenu.init()
    })
  }

  /**
   * Render current state.
   */
  render (): void {
    this.state.entities.forEach(renderable => {
      const ctx = this.contexts.get(renderable.contextId)

      if (ctx) {
        renderable.render(ctx)
      }
    })
  }

  /**
   *
   */
  clear (): void {
    this.state.entities.forEach(renderable => {
      const ctx = this.contexts.get(renderable.contextId)

      if (ctx) {
        renderable.clear(ctx)
      }
    })
  }
}
