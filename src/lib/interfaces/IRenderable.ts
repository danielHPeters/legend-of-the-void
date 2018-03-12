/**
 * Interface for entities who be rendered.
 */
import { ContextId } from '../../enum/ContextId'

export default interface IRenderable {
  contextId: ContextId

  /**
   * Render the entity.
   *
   * @param {CanvasRenderingContext2D} ctx Rendering Context
   */
  render (ctx: CanvasRenderingContext2D): void

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  clear (ctx: CanvasRenderingContext2D): void
}
