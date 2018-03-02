/**
 * Interface for entities who be rendered.
 */
export default interface IRenderable {
  /**
   * Render the entity.
   *
   * @param {CanvasRenderingContext2D} ctx Rendering Context
   */
  render (ctx: CanvasRenderingContext2D): void
}
