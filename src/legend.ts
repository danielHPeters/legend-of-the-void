import LegendOfTheVoid from './LegendOfTheVoid'
import GameSettings from './config/Settings'
import LegendState from './LegendState'
import InputManager from './lib/client/InputManager'

/**
 * Entry script for legend of the void.
 *
 * @author Daniel Peters
 * @version 1.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext('2d')
  const settings = new GameSettings(canvas)
  const inputManager = new InputManager(settings)
  const state = new LegendState(settings, inputManager)
  const game = new LegendOfTheVoid(state, context)
})