import SpriteSheet from './SpriteSheet'

/**
 * Animation class to animate a sprite sheet sequence.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Animation {
  private _spriteSheet: SpriteSheet
  private _speed: number
  private _sequence: number[]
  private _currentFrame: number
  private _counter: number

  /**
   * Constructor Sets all animation data.
   *
   * @param {SpriteSheet} spriteSheet corresponding sprite sheet
   * @param {number} speed animation speed
   * @param {number} start animation start frame
   * @param {number} end animation end frame
   */
  constructor (spriteSheet: SpriteSheet, speed: number, start: number, end: number) {
    this._spriteSheet = spriteSheet
    this._speed = speed
    this._sequence = []
    this._currentFrame = 0
    this._counter = 0

    for (let frame = start; frame <= end; frame++) {
      this._sequence.push(frame)
    }
  }

  /**
   * Update animation frames.
   */
  update (): void {
    if (this._counter === (this._speed - 1)) {
      this._currentFrame = (this._currentFrame + 1) % this._sequence.length
    }
    this._counter = (this._counter + 1) % this._speed
  }

  /**
   * Draw current frame
   * @param ctx canvas context
   * @param {number} x location x
   * @param {number} y location y
   * @param {number} width display width
   * @param {number} height display height
   */
  draw (ctx, x: number, y: number, width: number, height: number): void {
    let row = Math.floor(this._sequence[this._currentFrame] / this._spriteSheet.framesPerRow)
    let col = Math.floor(this._sequence[this._currentFrame] % this._spriteSheet.framesPerRow)
    ctx.drawImage(
      this._spriteSheet.image,
      col * this._spriteSheet.frameWidth,
      row * this._spriteSheet.frameHeight,
      this._spriteSheet.frameWidth,
      this._spriteSheet.frameHeight,
      x,
      y,
      width,
      height
    )
  }

  get spriteSheet (): SpriteSheet {
    return this._spriteSheet
  }

  set spriteSheet (value: SpriteSheet) {
    this._spriteSheet = value
  }

  get speed (): number {
    return this._speed
  }

  set speed (value: number) {
    this._speed = value
  }

  get sequence (): number[] {
    return this._sequence
  }

  set sequence (value: number[]) {
    this._sequence = value
  }

  get currentFrame (): number {
    return this._currentFrame
  }

  set currentFrame (value: number) {
    this._currentFrame = value
  }

  get counter (): number {
    return this._counter
  }

  set counter (value: number) {
    this._counter = value
  }
}
