import LegendOfTheVoid from './application/LegendOfTheVoid'
import GameSettings from './config/Settings'
import { ContextId } from './enum/ContextId'
import LegendLoop from './application/LegendLoop'

/**
 * Entry script for legend of the void.
 *
 * @author Daniel Peters
 * @version 1.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app')

  if (container) {
    const contexts = new Map<ContextId, CanvasRenderingContext2D>()
    const bgCanvas = document.createElement('canvas')
    const creepCanvas = document.createElement('canvas')
    const playerCanvas = document.createElement('canvas')
    const canvasSize = 660
    const bgContext = bgCanvas.getContext('2d')
    const creepContext = creepCanvas.getContext('2d')
    const playerContext = playerCanvas.getContext('2d')

    bgCanvas.classList.add('background-canvas')
    creepCanvas.classList.add('creep-canvas')
    playerCanvas.classList.add('player-canvas')

    if (bgContext && creepContext && playerContext) {
      container.appendChild(bgCanvas)
      container.appendChild(creepCanvas)
      container.appendChild(playerCanvas)

      contexts.set(ContextId.BACKGROUND, bgContext)
      contexts.set(ContextId.CREEPS, creepContext)
      contexts.set(ContextId.PLAYER, playerContext)
      bgCanvas.width = canvasSize
      bgCanvas.height = canvasSize
      creepCanvas.width = canvasSize
      creepCanvas.height = canvasSize
      playerCanvas.width = canvasSize
      playerCanvas.height = canvasSize

      const settings = new GameSettings(bgCanvas)
      const game = new LegendOfTheVoid(contexts, settings)
      const loop = new LegendLoop(game)

      loop.start()
    }
  }
})
