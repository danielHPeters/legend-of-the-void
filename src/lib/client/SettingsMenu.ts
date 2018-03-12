import Settings from '../../config/Settings'
import { Actions } from './InputManager'
import AssetManager from './AssetManager'
import EventHandler from '../event/EventHandler'
import AudioManager from './AudioManager'

/**
 * Simple settings menu.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SettingsMenu {
  element: HTMLDivElement
  mainMenu: HTMLDivElement
  settings: Settings
  assetManager: AssetManager
  audioManager: AudioManager
  showing: boolean

  constructor (element, settings: Settings, assetManager: AssetManager, audioManager: AudioManager) {
    this.element = element
    this.settings = settings
    this.assetManager = assetManager
    this.audioManager = audioManager
    this.showing = false
  }

  createMainMenu (): void {
    this.mainMenu = document.createElement('div')
    this.mainMenu.classList.add('tab')
    this.element.appendChild(this.mainMenu)
  }

  openTab (event, tabId: string): void {
    let tabContent
    let tabLink
    tabContent = document.getElementsByClassName('tabContent')
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none'
    }
    tabLink = document.getElementsByClassName('tabLink')
    for (let i = 0; i < tabLink.length; i++) {
      tabLink[i].className = tabLink[i].className.replace(' active', '')
    }
    document.getElementById(tabId).style.display = 'block'
    event.currentTarget.className += ' active'
  }

  createKeyboardMenu (): void {
    let keyboardMenuId = 'keyboardMenu'
    let keyboardLink = document.createElement('button')
    let keyboardDiv = document.createElement('div')
    let title = document.createElement('h4')
    let form = document.createElement('form')
    let submit = document.createElement('input')
    EventHandler.registerOnElement(
      keyboardLink,
      ['click', 'touchstart'],
      event => this.openTab(event, keyboardMenuId)
    )
    keyboardLink.appendChild(document.createTextNode('Keyboard'))
    keyboardLink.classList.add('tabLink')
    this.mainMenu.appendChild(keyboardLink)
    keyboardDiv.setAttribute('id', keyboardMenuId)
    keyboardDiv.classList.add('tabContent')
    title.appendChild(document.createTextNode('Keyboard'))
    form.setAttribute('id', 'keyboardSettings')
    form.setAttribute('method', 'post')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Save')
    keyboardDiv.appendChild(title)
    keyboardDiv.appendChild(form)
    this.element.appendChild(keyboardDiv)
    Object.keys(this.settings.keyBoard).forEach(setting => this.addEntry(setting, form))
    form.appendChild(submit)
    form.addEventListener('submit', event => {
      event.preventDefault()
      this.settings.setKey((document.getElementById(Actions.UP) as HTMLInputElement).value, Actions.UP)
      this.settings.setKey((document.getElementById(Actions.DOWN) as HTMLInputElement).value, Actions.DOWN)
      this.settings.setKey((document.getElementById(Actions.LEFT) as HTMLInputElement).value, Actions.LEFT)
      this.settings.setKey((document.getElementById(Actions.RIGHT) as HTMLInputElement).value, Actions.RIGHT)
      this.settings.setKey((document.getElementById(Actions.SHOOT) as HTMLInputElement).value, Actions.SHOOT)
      this.settings.setKey((document.getElementById(Actions.RESTART) as HTMLInputElement).value, Actions.RESTART)
      this.clear()
    })
  }

  createPlayerMenu (): void {
    let playerMenuId = 'playerMenu'
    let playerLink = document.createElement('button')
    let playerDiv = document.createElement('div')
    let playerTitle = document.createElement('h4')
    let playerForm = document.createElement('form')
    let playerSubmit = document.createElement('input')
    EventHandler.registerOnElement(
      playerLink,
      ['click', 'touchstart'],
      event => this.openTab(event, playerMenuId)
    )
    playerLink.appendChild(document.createTextNode('Player'))
    playerLink.classList.add('tabLink')
    this.mainMenu.appendChild(playerLink)
    playerDiv.setAttribute('id', playerMenuId)
    playerDiv.classList.add('tabContent')
    playerTitle.appendChild(document.createTextNode('Player Settings'))
    playerForm.setAttribute('id', 'playerSettings')
    playerForm.setAttribute('method', 'post')
    playerSubmit.setAttribute('type', 'submit')
    playerSubmit.setAttribute('value', 'Save')
    playerDiv.appendChild(playerTitle)
    playerDiv.appendChild(playerForm)
    this.element.appendChild(playerDiv)
    Object.keys(this.settings.player).forEach(setting => this.addPlayerSettingEntry(setting, playerForm))
    playerForm.appendChild(playerSubmit)
    playerForm.addEventListener('submit', event => {
      event.preventDefault()
      this.settings.player.acceleration = Number((document.getElementById('acceleration') as HTMLInputElement).value)
      this.settings.player.maxVelocity = Number((document.getElementById('maxVelocity') as HTMLInputElement).value)
      this.settings.player.friction = Number((document.getElementById('friction') as HTMLInputElement).value)
      this.settings.player.fireDelay = Number((document.getElementById('fireDelay') as HTMLInputElement).value)
      this.clear()
    })
  }

  createAudioMenu (): void {
    let audioMenuId = 'audioMenu'
    let audioLink = document.createElement('button')
    let audioDiv = document.createElement('div')
    let div = document.createElement('div')
    let audioTitle = document.createElement('h4')
    let audioLabel = document.createElement('label')
    let audioSlide = document.createElement('input')
    EventHandler.registerOnElement(
      audioLink,
      ['click', 'touchstart'],
      event => this.openTab(event, audioMenuId)
    )
    audioLink.classList.add('tabLink')
    audioLink.appendChild(document.createTextNode('Audio'))
    this.mainMenu.appendChild(audioLink)
    audioDiv.setAttribute('id', audioMenuId)
    audioDiv.classList.add('tabContent')
    div.classList.add('row')
    audioTitle.appendChild(document.createTextNode('Audio Settings'))
    audioLabel.appendChild(document.createTextNode('Master Volume:'))
    audioLabel.setAttribute('for', 'masterVolume')
    audioSlide.setAttribute('id', 'masterVolume')
    audioSlide.setAttribute('type', 'range')
    audioSlide.setAttribute('min', '0')
    audioSlide.setAttribute('max', '1')
    audioSlide.setAttribute('step', '0.1')
    audioSlide.addEventListener('change', event => this.audioManager.adjustMasterVolume(Number(audioSlide.value)))
    div.appendChild(audioTitle)
    div.appendChild(audioLabel)
    div.appendChild(audioSlide)
    audioDiv.appendChild(div)

    let ambientDiv = document.createElement('div')
    let ambientLabel = document.createElement('label')
    let ambientSlide = document.createElement('input')
    ambientDiv.classList.add('row')
    ambientLabel.appendChild(document.createTextNode('Ambient Volume:'))
    ambientLabel.setAttribute('for', 'ambientVolume')
    ambientSlide.setAttribute('id', 'ambientVolume')
    ambientSlide.setAttribute('type', 'range')
    ambientSlide.setAttribute('min', '0')
    ambientSlide.setAttribute('max', '1')
    ambientSlide.setAttribute('step', '0.1')
    ambientSlide.addEventListener('change', event => this.audioManager.adjustAmbientVolume(Number(ambientSlide.value)))
    ambientDiv.appendChild(ambientLabel)
    ambientDiv.appendChild(ambientSlide)
    audioDiv.appendChild(ambientDiv)

    let effectsDiv = document.createElement('div')
    let effectsLabel = document.createElement('label')
    let effectsSlide = document.createElement('input')
    effectsDiv.classList.add('row')
    effectsLabel.appendChild(document.createTextNode('Effects Volume:'))
    effectsLabel.setAttribute('for', 'effectsVolume')
    effectsSlide.setAttribute('id', 'effectsVolume')
    effectsSlide.setAttribute('type', 'range')
    effectsSlide.setAttribute('min', '0')
    effectsSlide.setAttribute('max', '1')
    effectsSlide.setAttribute('step', '0.1')
    effectsSlide.addEventListener('change', event => this.audioManager.adjustEffectsVolume(Number(effectsSlide.value)))
    effectsDiv.appendChild(effectsLabel)
    effectsDiv.appendChild(effectsSlide)
    audioDiv.appendChild(effectsDiv)
    this.element.appendChild(audioDiv)
  }

  init (): void {
    this.createMainMenu()
    this.createKeyboardMenu()
    this.createPlayerMenu()
    this.createAudioMenu()
  }

  clear (): void {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
    this.init()
  }

  addPlayerSettingEntry (setting, element): void {
    let label = document.createElement('label')
    let input = document.createElement('input')
    let row = document.createElement('div')
    label.setAttribute('for', setting)
    label.appendChild(document.createTextNode(setting + ':'))
    input.setAttribute('id', setting)
    input.setAttribute('type', 'number')
    input.setAttribute('name', setting)
    input.setAttribute('value', this.settings.player[setting])
    row.classList.add('row')
    row.appendChild(label)
    row.appendChild(input)
    element.appendChild(row)
  }

  addEntry (setting, element): void {
    let row = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')
    row.classList.add('row')
    label.setAttribute('for', this.settings.keyBoard[setting])
    label.appendChild(document.createTextNode(this.settings.keyBoard[setting] + ':'))
    input.setAttribute('id', this.settings.keyBoard[setting])
    input.setAttribute('type', 'text')
    input.setAttribute('name', this.settings.keyBoard[setting])
    input.setAttribute('value', setting)
    row.appendChild(label)
    row.appendChild(input)
    element.appendChild(row)
  }

  toggleShow (): void {
    if (this.showing) {
      this.element.style.display = 'none'
      this.showing = false
    } else {
      this.element.style.display = 'block'
      this.showing = true
    }
  }
}
