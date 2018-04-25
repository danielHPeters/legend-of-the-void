import IGameState from '../lib/interfaces/IGameState'
import IGame from '../lib/interfaces/IGame'
import ICollisionManager from '../lib/interfaces/ICollisionManager'
import InputManager from '../lib/client/InputManager'
import AssetManager from '../lib/client/AssetManager'
import { ContextId } from '../enum/ContextId'
import Settings from '../config/Settings'
import LegendState from './LegendState'
import AudioManager from '../lib/client/AudioManager'
import CollisionManager from '../lib/collision/CollisionManager'
import * as mapData from '../../public/definitions/maps.json'
import * as turretData from '../../public/definitions/turrets.json'
import Tile from '../model/Tile'
import Turret from '../model/Turret'

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
  }

  initMap (): void {
    console.log(mapData)
    let y = 0
    mapData[0].tiles.forEach(row => {
      let width = 30
      let height = 30
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
   this.initMap()
   turretData.forEach(tr => {
     const turret = new Turret()
     turret.fromJSON(tr)
     this.state.entities.push(turret)
     this.state.renderables.push(turret)
   })
    this.assetManager.downloadAll(() => {
      this.state.renderables.forEach(renderable => renderable.asset = this.assetManager.get(renderable.assetId))
      this.state.reset()
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
