import LegendOfTheVoid from './LegendOfTheVoid'
import GameSettings from './config/Settings'
import LegendState from './LegendState'
import InputManager from './lib/client/InputManager'
import { ContextId } from './enum/ContextId'

/**
 * Entry script for legend of the void.
 *
 * @author Daniel Peters
 * @version 1.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const contexts = new Map<ContextId, CanvasRenderingContext2D>()
  const bgCanvas = document.createElement('canvas')
  contexts.set(ContextId.BACKGROUND, bgCanvas.getContext('2d'))
  bgCanvas.width = window.innerWidth
  bgCanvas.height = window.innerHeight
  const settings = new GameSettings(bgCanvas)
  const game = new LegendOfTheVoid(contexts, settings)
})