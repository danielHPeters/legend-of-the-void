import HitBox from '../collision/HitBox'

/**
 * Creates a map out of a tileset.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class TileSetMap {
  tileSetImage: HTMLImageElement
  image: HTMLImageElement
  width: number
  height: number
  context
  mapLayers
  tileSize: number
  tilesPerRow: number
  tilesPerColumn: number
  imageTilesPerRow: number
  hitBoxes: Array<HitBox>

  /**
   *
   * @param image
   * @param mapLayers
   * @param context
   * @param {number} tileSize
   * @param {number} tilesPerRow
   * @param {number} tilesPerColumn
   * @param {number} imageTilesPerRow
   */
  constructor (image, mapLayers, context, tileSize: number, tilesPerRow: number, tilesPerColumn: number, imageTilesPerRow: number) {
    this.tileSetImage = image
    this.width = tilesPerRow * tileSize
    this.height = tilesPerColumn * tileSize
    this.mapLayers = mapLayers
    this.context = context
    this.tileSize = tileSize
    this.tilesPerRow = tilesPerRow
    this.tilesPerColumn = tilesPerColumn
    this.imageTilesPerRow = imageTilesPerRow
    this.hitBoxes = []
    console.log(this.width)
    console.log(this.height)
  }

  /**
   *
   */
  generate (): void {
    let ctx = document.createElement('canvas').getContext('2d')
    ctx.canvas.width = this.width
    ctx.canvas.height = this.height

    this.mapLayers.forEach(layer => this.generateLayer(ctx, layer))

    // store the generate map as this tileSetImage texture
    this.image = new Image()
    this.image.src = ctx.canvas.toDataURL('image/png')

    // clear context
    ctx = null
  }

  /**
   *
   * @param ctx
   * @param layer
   */
  generateLayer (ctx, layer): void {
    for (let row = 0; row < this.tilesPerColumn; row++) {
      for (let col = 0; col < this.tilesPerRow; col++) {
        let tile = layer[row][col]
        if (tile !== 0 && this.mapLayers.indexOf(layer) === this.mapLayers.length - 1) {
          this.hitBoxes.push(new HitBox((col * this.tileSize), (row * this.tileSize), this.tileSize, this.tileSize))
        }
        let tileRow = (tile / this.imageTilesPerRow) | 0
        let tileCol = (tile % this.imageTilesPerRow) | 0
        ctx.drawImage(
          this.tileSetImage,
          (tileCol * this.tileSize),
          (tileRow * this.tileSize),
          this.tileSize,
          this.tileSize,
          (col * this.tileSize),
          (row * this.tileSize),
          this.tileSize,
          this.tileSize
        )
      }
    }
  }

  /**
   * draw the map adjusted to camera
   * @param xView
   * @param yView
   */
  draw (xView, yView): void {
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height)
  }
}
