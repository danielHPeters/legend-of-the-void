/**
 * Interface for entities who be rendered.
 */
import { ContextId } from '../../enum/ContextId'
import { AssetId } from '../../enum/AssetId'

export default interface IRenderable {
  contextId: ContextId
  assetId: AssetId
  asset

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
