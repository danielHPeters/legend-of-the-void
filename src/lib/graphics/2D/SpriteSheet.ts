/**
 * Sprite sheet definition.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SpriteSheet {
  public image: HTMLImageElement
  public frameWidth: number
  public frameHeight: number
  public framesPerRow: number

  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   *
   * @param image
   * @param frameWidth
   * @param frameHeight
   */
  constructor (image: HTMLImageElement, frameWidth, frameHeight) {
    this.image = image
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.framesPerRow = Math.floor(image.width / frameWidth)
  }
}
