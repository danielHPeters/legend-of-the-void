import LegendOfTheVoid from './application/LegendOfTheVoid'
import GameSettings from './config/Settings'
import { ContextId } from './enum/ContextId'
import LegendLoop from './application/LegendLoop'
import Vector2 from './lib/math/Vector2'

/**
 * Entry script for legend of the void.
 *
 * @author Daniel Peters
 * @version 1.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('contents')
  const contexts = new Map<ContextId, CanvasRenderingContext2D>()
  const bgCanvas = document.createElement('canvas')
  const creepCanvas = document.createElement('canvas')
  const playerCanvas = document.createElement('canvas')
  const canvasSize = 660
  container.appendChild(bgCanvas)
  container.appendChild(creepCanvas)
  container.appendChild(playerCanvas)
  contexts.set(ContextId.BACKGROUND, bgCanvas.getContext('2d'))
  contexts.set(ContextId.CREEPS, creepCanvas.getContext('2d'))
  contexts.set(ContextId.PLAYER, playerCanvas.getContext('2d'))
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
  game.addTurret("laser", new Vector2(2, 2))
})