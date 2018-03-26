import SpriteSheet from '../graphics/2D/SpriteSheet'
import Sound from '../audio/Sound'
import Ajax from '../ajax/Ajax'
import { AssetId } from '../../enum/AssetId'
import AudioManager from './AudioManager'

export enum AssetType {
  SPRITE = 'SPRITE', SPRITE_SHEET = 'SPRITE_SHEET', AUDIO = 'AUDIO', AUDIO_AMB = 'LOOP'
}

/**
 * Asset manager Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class AssetManager {
  private cache
  private queue
  private downloadCount: number
  private audioManager: AudioManager

  /**
   * Constructor.
   *
   * @param {AudioManager} audioManager
   */
  constructor (audioManager: AudioManager) {
    this.cache = {
      sprites: {},
      spriteSheets: {},
      audio: {}
    }
    this.downloadCount = 0
    this.queue = []
    this.audioManager = audioManager
  }

  /**
   *
   * @returns {boolean}
   */
  done (): boolean {
    return this.downloadCount === this.queue.length
  }

  /**
   *
   * @param {AssetId} id
   * @param {string} path
   * @param {AssetType} type
   * @param {{}} opts
   */
  queueDownload (id: AssetId, path: string, type: AssetType, opts = null): void {
    this.queue.push({ id: id, path: path, type: type, opts: opts })
  }

  /**
   * Build an AJAX Request to loadAudio audio file into the buffer cache.
   *
   * @param item object with name of file and path to file
   * @param callback function to execute on done
   */
  loadAudio (item, callback): void {
    Ajax.create({
      method: 'GET',
      url: item.path,
      responseType: 'arraybuffer'
    }, response => {
      this.audioManager.decodeAudio(response, item.id, buffer => {
        this.cache.audio[item.id] = buffer
        this.downloadCount += 1
        if (this.done()) {
          callback()
        }
      })
    })
  }

  /**
   *
   * @param item
   * @param callback
   */
  loadSprite (item, callback): void {
    let sprite = new Image()
    sprite.addEventListener('load', () => {
      this.downloadCount++
      if (this.done()) {
        callback()
      }
    })
    sprite.src = item.path
    this.cache.sprites[item.id] = sprite
  }

  /**
   * Load sprites sheet.
   *
   * @param item sprite sheet info
   * @param callback called upon downloading all
   */
  loadSpriteSheet (item, callback): void {
    let spriteSheet = new Image()
    spriteSheet.addEventListener('load', () => {
      this.cache.spriteSheets[item.id] = new SpriteSheet(spriteSheet, item.opts.frameWidth || 0, item.opts.frameHeight || 0)
      this.downloadCount += 1
      if (this.done()) {
        callback()
      }
    })
    spriteSheet.src = item.path
  }

  /**
   *
   * @param callback
   */
  downloadAll (callback): void {
    this.queue.forEach(item => {
      if (item.type === AssetType.AUDIO) {
        this.loadAudio(item, callback)
      } else if (item.type === AssetType.SPRITE) {
        this.loadSprite(item, callback)
      } else if (item.type === AssetType.SPRITE_SHEET) {
        this.loadSpriteSheet(item, callback)
      }
    })
  }

  /**
   * Create an audio buffer source node from cached buffer.
   * Send it to the destination of the audio context and play it.
   *
   * @param {AssetId} id file id
   * @param {AssetType} type
   */
  getSound (id: AssetId, type: AssetType): Sound {
    let ambient = type === AssetType.AUDIO_AMB
    return this.audioManager.createSound(this.cache.audio[id], ambient)
  }

  /**
   *
   * @param {AssetId} id
   * @returns {any}
   */
  getSprite (id: AssetId): any {
    return this.cache.sprites[id]
  }

  /**
   * Get sprite sheet by name.
   *
   * @param {AssetId} id
   * @returns {SpriteSheet}
   */
  getSpriteSheet (id: AssetId): SpriteSheet {
    return this.cache.spriteSheets[id]
  }
}
