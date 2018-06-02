
import { ContextId } from '../../enum/ContextId'
import { AssetId } from '../../enum/AssetId'

/**
 * Interface for entities which can be rendered on canvas.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Renderable {
  /**
   * Context id on which the renderable will be rendered.
   */
  contextId: ContextId
  /**
   * Id of the asset.
   */
  assetId: AssetId
  /**
   * Asset object. Usually an image.
   */
  asset

  /**
   * Render the entity.
   *
   * @param ctx Rendering Context
   */
  render (ctx: CanvasRenderingContext2D): void

  /**
   *
   * @param ctx
   */
  clear (ctx: CanvasRenderingContext2D): void
}
