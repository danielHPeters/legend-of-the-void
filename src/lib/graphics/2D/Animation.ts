import SpriteSheet from './SpriteSheet'

/**
 * Animation class to animate a sprite sheet sequence.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Animation {
  private spriteSheet: SpriteSheet
  private speed: number
  private sequence: number[]
  private currentFrame: number
  private counter: number

  /**
   * Constructor Sets all animation data.
   *
   * @param {SpriteSheet} spriteSheet corresponding sprite sheet
   * @param {number} speed animation speed
   * @param {number} start animation start frame
   * @param {number} end animation end frame
   */
  constructor (spriteSheet: SpriteSheet, speed: number, start: number, end: number) {
    this.spriteSheet = spriteSheet
    this.speed = speed
    this.sequence = []
    this.currentFrame = 0
    this.counter = 0

    for (let frame = start; frame <= end; frame++) {
      this.sequence.push(frame)
    }
  }

  /**
   * Update animation frames.
   */
  public update (): void {
    if (this.counter === (this.speed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.sequence.length
    }
    this.counter = (this.counter + 1) % this.speed
  }

  /**
   * Draw current frame
   * @param ctx canvas context
   * @param {number} x location x
   * @param {number} y location y
   * @param {number} width display width
   * @param {number} height display height
   */
  public render (ctx, x: number, y: number, width: number, height: number): void {
    let row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow)
    let col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow)
    ctx.drawImage(
      this.spriteSheet.image,
      col * this.spriteSheet.frameWidth,
      row * this.spriteSheet.frameHeight,
      this.spriteSheet.frameWidth,
      this.spriteSheet.frameHeight,
      x,
      y,
      width,
      height
    )
  }
}
