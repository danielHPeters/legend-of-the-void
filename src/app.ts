import LegendOfTheVoid from './LegendOfTheVoid'
import GameSettings from './config/Settings'
import LegendState from './LegendState'
import InputManager from './lib/client/InputManager'
import { ContextId } from './enum/ContextId'
import LegendLoop from './LegendLoop'

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
  container.appendChild(bgCanvas)
  container.appendChild(creepCanvas)
  container.appendChild(playerCanvas)
  contexts.set(ContextId.BACKGROUND, bgCanvas.getContext('2d'))
  contexts.set(ContextId.CREEPS, creepCanvas.getContext('2d'))
  contexts.set(ContextId.PLAYER, playerCanvas.getContext('2d'))
  bgCanvas.width = window.innerWidth
  bgCanvas.height = window.innerHeight
  creepCanvas.width = window.innerWidth
  creepCanvas.height = window.innerHeight
  playerCanvas.width = window.innerWidth
  playerCanvas.height = window.innerHeight

  const settings = new GameSettings(bgCanvas)
  const game = new LegendOfTheVoid(contexts, settings)
  const loop = new LegendLoop(game)

  loop.start()
})