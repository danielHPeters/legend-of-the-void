/**
 * Sprite sheet definition.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SpriteSheet {
  image: HTMLImageElement
  frameWidth: number
  frameHeight: number
  framesPerRow: number

  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   *
   * @param image
   * @param frameWidth
   * @param frameHeight
   */
  constructor (image: HTMLImageElement, frameWidth: number, frameHeight: number) {
    this.image = image
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.framesPerRow = Math.floor(image.width / frameWidth)
  }
}
