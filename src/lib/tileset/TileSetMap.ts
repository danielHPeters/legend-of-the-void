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
  context: CanvasRenderingContext2D
  mapLayers: number[][]
  tileSize: number
  tilesPerRow: number
  tilesPerColumn: number
  imageTilesPerRow: number
  hitBoxes: HitBox[]

  /**
   *
   * @param image
   * @param mapLayers
   * @param context
   * @param tileSize
   * @param tilesPerRow
   * @param tilesPerColumn
   * @param imageTilesPerRow
   */
  constructor (image: HTMLImageElement, mapLayers: number[][], context: CanvasRenderingContext2D, tileSize: number, tilesPerRow: number, tilesPerColumn: number, imageTilesPerRow: number) {
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
  }

  /**
   * Pre renders the world map as an image using the layer definition arrays.
   * This saves processeing power which is especially imprtant on low end clients.
   */
  generate (): void {
    // Create a temporary canvas rendering context.
    let ctx = document.createElement('canvas').getContext('2d')
    ctx.canvas.width = this.width
    ctx.canvas.height = this.height

    this.mapLayers.forEach(layer => this.generateLayer(ctx, layer))

    // Store the generate map as this tileSetImage texture.
    this.image = new Image()
    this.image.src = ctx.canvas.toDataURL('image/png')

    // Clear context.
    ctx = null
  }

  /**
   * Draw the map adjusted to camera.
   *
   * @param xView Camera X
   * @param yView Camera Y
   */
  draw (xView: number, yView: number): void {
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height)
  }

  /**
   * Generate a single map layer with the layer array definition.
   * Currently also adds hitboxes.
   * TODO: Decouple Hitbox generation.
   *
   * @param ctx Rendering context.
   * @param layer Layer definition array.
   */
  private generateLayer (ctx: CanvasRenderingContext2D, layer: number[]): void {
    for (let row = 0; row < this.tilesPerColumn; row++) {
      for (let col = 0; col < this.tilesPerRow; col++) {
        const tile = layer[row][col]
        if (tile !== 0 && this.mapLayers.indexOf(layer) === this.mapLayers.length - 1) {
          this.hitBoxes.push(new HitBox((col * this.tileSize), (row * this.tileSize), this.tileSize, this.tileSize))
        }
        const tileRow = (tile / this.imageTilesPerRow) | 0
        const tileCol = (tile % this.imageTilesPerRow) | 0
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
}
