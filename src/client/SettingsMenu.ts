
import { Actions } from './InputManager'
import GameSettings from '../config/GameSettings'

export default class SettingsMenu {
  element: HTMLDivElement
  mainMenu: HTMLDivElement
  settings: GameSettings
  showing: boolean

  constructor (element, settings: GameSettings) {
    this.element = element
    this.settings = settings
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
    keyboardLink.addEventListener('click', event => this.openTab(event, keyboardMenuId))
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
    Object.keys(this.settings.keyboard).forEach(setting => this.addEntry(setting, form))
    form.appendChild(submit)
    form.addEventListener('submit', event => {
      event.preventDefault()
      this.settings.setKey((document.getElementById(Actions.P1_UP) as HTMLInputElement).value, Actions.P1_UP)
      this.settings.setKey((document.getElementById(Actions.P1_DOWN) as HTMLInputElement).value, Actions.P1_DOWN)
      this.settings.setKey((document.getElementById(Actions.RESTART) as HTMLInputElement).value, Actions.RESTART)
      this.clear()
    })
  }

  init (): void {
    this.createMainMenu()
    this.createKeyboardMenu()
  }

  clear (): void {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild)
    }
    this.init()
  }

  addEntry (setting, element): void {
    let row = document.createElement('div')
    let label = document.createElement('label')
    let input = document.createElement('input')
    row.classList.add('row')
    label.setAttribute('for', this.settings.keyboard[setting])
    label.appendChild(document.createTextNode(this.settings.keyboard[setting] + ':'))
    input.setAttribute('id', this.settings.keyboard[setting])
    input.setAttribute('type', 'text')
    input.setAttribute('name', this.settings.keyboard[setting])
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
