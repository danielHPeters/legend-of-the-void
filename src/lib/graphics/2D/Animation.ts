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
   * @param spriteSheet corresponding sprite sheet
   * @param speed animation speed
   * @param start animation start frame
   * @param end animation end frame
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
  update (): void {
    if (this.counter === (this.speed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.sequence.length
    }
    this.counter = (this.counter + 1) % this.speed
  }

  /**
   * Draw current frame
   *
   * @param ctx canvas context
   * @param x location x
   * @param y location y
   * @param width display width
   * @param height display height
   */
  render (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
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
