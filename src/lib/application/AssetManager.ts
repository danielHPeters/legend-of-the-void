import SpriteSheet from '../graphics/2D/SpriteSheet'
import Ajax from '../network/Ajax'
import { AssetId } from '../../enum/AssetId'
import AudioManager from '../audio/AudioManager'

export enum AssetType {
  SPRITE = 'sprite', SPRITE_SHEET = 'sprite-sheet', AUDIO = 'audio', AUDIO_AMB = 'audio-amb'
}

/**
 * Asset manager Class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class AssetManager {
  private cache
  private assetsDir: string
  private queue
  private downloadCount: number
  private audioManager: AudioManager

  /**
   * Constructor.
   *
   * @param {AudioManager} audioManager
   */
  constructor (audioManager: AudioManager) {
    this.cache = []
    this.assetsDir = 'assets/'
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
   * @param {AssetType} type
   * @param opts
   */
  queueDownload (id: AssetId, type: AssetType, opts = null): void {
    this.queue.push({ id: id, path: this.assetsDir + type + '/' + id + '.png', type: type, opts: opts })
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
        this.cache[item.id] = buffer
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
    this.cache[item.id] = sprite
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
      this.cache[item.id] = new SpriteSheet(spriteSheet, item.opts.frameWidth || 0, item.opts.frameHeight || 0)
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
   * @param {AssetId} id File id
   * @param {AssetType} type
   */
  get (id: AssetId, type: AssetType = AssetType.SPRITE): any {
    if (type === AssetType.AUDIO || type === AssetType.AUDIO_AMB) {
      let ambient = type === AssetType.AUDIO_AMB
      return this.audioManager.createSound(this.cache[id], ambient)
    } else {
      return this.cache[id]
    }
  }
}
