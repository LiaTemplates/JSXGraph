import * as JXG from 'jsxgraph'

export class JSXGraph extends HTMLElement {
  private board: any // Will be properly typed when integrating actual JSXGraph library
  private container: HTMLDivElement

  private code_: string
  private options: any

  static get observedAttributes(): string[] {
    return ['width', 'height']
  }

  constructor() {
    super()
    this.container = document.createElement('div')
  }

  connectedCallback(): void {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(this.container)
    this.options = this.getOptions()

    // Add event listener for double-click
    this.container.addEventListener(
      'dblclick',
      this.handleDoubleClick.bind(this)
    )

    this.initBoard()
  }

  disconnectedCallback(): void {
    this.destroyBoard()
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (oldValue === newValue) return

    if (this.isConnected && this.options) {
      this.updateBoard(name, newValue)
    }
  }

  private initBoard(): void {
    this.container.style.width = '100%'
    this.container.style.aspectRatio = '10 / 6'
    this.container.style.maxHeight = '80vh'
    this.container.style.marginBottom = '1.5rem'

    this.container.className = 'jxgbox'
    const jxgbox = this.container as HTMLDivElement

    this.code_ = this.getAttribute('code') || ''

    let board = JXG.JSXGraph.initBoard(jxgbox, this.options)
    this.board = board
    if (!this.code_) {
      this.code_ = this.innerText || this.innerHTML || ''
      // Replace these lines:
      this.code_ = this.code_.replace(/&lt;/g, '<')
      this.code_ = this.code_.replace(/&gt;/g, '>')

      if (this.getBool('background') !== false) {
        this.container.style.backgroundColor = '#eee'
        this.container.style.borderRadius = '8px'
      }
    }

    try {
      // console.log('Evaluating JSXGraph code:', this.code_)
      eval(this.code_)
      this.board = board
    } catch (error) {
      console.error('Error evaluating JSXGraph code:', error)
    }
  }

  private getOptions(): any {
    const options: any = {
      resize: {
        enabled: true,
        throttle: 0,
      },
    }

    const axis =
      this.getBool('axis') === undefined ? true : this.getBool('axis')
    const beautifulScientificTickLabels = this.getBool(
      'beautifulScientificTickLabels'
    )
    const takeFirst = this.getBool('takeFirst')
    const takeSizeFromFile = this.getBool('takeSizeFromFile')
    const registerEvents = this.getBool('registerEvents')
    const grid = this.getBool('grid')
    const ignoreLabels = this.getBool('ignoreLabels')
    const keepaspectratio = this.getBool('keepaspectratio')
    const showClearTraces = this.getBool('showClearTraces')
    const showCopyright = this.getBool('showCopyright') || false
    const showFullscreen = this.getBool('showFullscreen')
    const showInfobox = this.getBool('showInfobox')
    const showScreenshot = this.getBool('showScreenshot')
    const showNavigation = this.getBool('showNavigation')
    const showReload = this.getBool('showReload')
    const showZoom = this.getBool('showZoom')
    const zoom = this.getBool('zoom')

    const animationDelay = this.getNumber('animationDelay')
    const maxFrameRate = this.getNumber('maxFrameRate')
    const offsetX = this.getNumber('offsetX')
    const offsetY = this.getNumber('offsetY')
    const maxNameLength = this.getNumber('maxNameLength')
    const zoomX = this.getNumber('zoomX')
    const zoomY = this.getNumber('zoomY')

    const description = this.getString('description')
    const minimizeReflow = this.getString('minimizeReflow')
    const renderer = this.getString('renderer')
    const title = this.getString('title')

    const boundingBox = this.getObject('boundingbox') || [-10, 10, 10, -10]
    const maxBoundingBox = this.getObject('maxBoundingBox')
    const drag = this.getObject('drag')
    const pan = this.getObject('pan')
    const selection = this.getObject('selection')
    const fullscreen = this.getObject('fullscreen')
    const screenshot = this.getObject('screenshot')

    if (axis !== undefined) options.axis = axis
    if (beautifulScientificTickLabels !== undefined)
      options.beautifulScientificTickLabels = beautifulScientificTickLabels
    if (takeFirst !== undefined) options.takeFirst = takeFirst
    if (takeSizeFromFile !== undefined)
      options.takeSizeFromFile = takeSizeFromFile
    if (registerEvents !== undefined) options.registerEvents = registerEvents
    if (grid !== undefined) options.grid = grid
    if (ignoreLabels !== undefined) options.ignoreLabels = ignoreLabels
    if (keepaspectratio !== undefined) options.keepaspectratio = keepaspectratio
    if (showClearTraces !== undefined) options.showClearTraces = showClearTraces
    if (showCopyright !== undefined) options.showCopyright = showCopyright
    if (showFullscreen !== undefined) options.showFullscreen = showFullscreen
    if (showInfobox !== undefined) options.showInfobox = showInfobox
    if (showScreenshot !== undefined) options.showScreenshot = showScreenshot
    if (showNavigation !== undefined) options.showNavigation = showNavigation
    if (showReload !== undefined) options.showReload = showReload
    if (showZoom !== undefined) options.showZoom = showZoom
    if (zoom !== undefined) options.zoom = zoom
    if (animationDelay !== undefined) options.animationDelay = animationDelay
    if (maxFrameRate !== undefined) options.maxFrameRate = maxFrameRate
    if (offsetX !== undefined) options.offsetX = offsetX
    if (offsetY !== undefined) options.offsetY = offsetY
    if (maxNameLength !== undefined) options.maxNameLength = maxNameLength
    if (zoomX !== undefined) options.zoomX = zoomX
    if (zoomY !== undefined) options.zoomY = zoomY
    if (description !== undefined) options.description = description
    if (minimizeReflow !== undefined) options.minimizeReflow = minimizeReflow
    if (renderer !== undefined) options.renderer = renderer
    if (title !== undefined) options.title = title
    if (boundingBox !== undefined) options.boundingBox = boundingBox
    if (maxBoundingBox !== undefined) options.maxBoundingBox = maxBoundingBox
    if (drag !== undefined) options.drag = drag
    if (pan !== undefined) options.pan = pan
    if (selection !== undefined) options.selection = selection
    if (fullscreen !== undefined) options.fullscreen = fullscreen
    if (screenshot !== undefined) options.screenshot = screenshot

    return options
  }

  private updateBoard(attribute: string, value: string): void {
    // Handle attribute changes

    switch (attribute) {
      case 'description':
      case 'minimizeReflow':
      case 'renderer':
      case 'title':
        this.options[attribute] = value
        break
      default:
        try {
          this.options[attribute] = JSON.parse(value)
        } catch (e) {
          console.error(`Invalid value for ${attribute}:`, value)
        }
    }
  }

  private destroyBoard(): void {
    if (this.board) {
      // Remove the double-click event listener
      this.container.removeEventListener(
        'dblclick',
        this.handleDoubleClick.bind(this)
      )

      // Properly free the board using JSXGraph's API
      JXG.JSXGraph.freeBoard(this.board)
      this.board = null
    }
  }

  private getBool(name: string): boolean | undefined {
    const value = this.getAttribute(name)

    if (value === 'true') return true

    if (value === 'false') return false

    return undefined
  }

  private getNumber(name: string): number | undefined {
    const value = this.getAttribute(name)
    if (value === null || value === undefined) return undefined
    const num = parseFloat(value)
    return isNaN(num) ? undefined : num
  }

  private getString(name: string): string | undefined {
    const value = this.getAttribute(name)
    return value !== null && value !== undefined ? value : undefined
  }

  private getObject(name: string): any {
    const value = this.getAttribute(name)
    if (!value) return undefined

    try {
      return JSON.parse(value)
    } catch (e) {
      console.error('Invalid object format:', value)
      return undefined
    }
  }

  // Add this new method to handle double-clicks
  private handleDoubleClick(event: MouseEvent): void {
    // Create a new double-click event
    const newEvent = new MouseEvent('dblclick', {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: event.detail,
      screenX: event.screenX,
      screenY: event.screenY,
      clientX: event.clientX,
      clientY: event.clientY,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      metaKey: event.metaKey,
      button: event.button,
      buttons: event.buttons,
    })

    // Stop the original event from propagating
    event.stopPropagation()

    // Dispatch the new event from the host element
    this.dispatchEvent(newEvent)
  }
}

// Register the web component
customElements.define('jsx-graph', JSXGraph)
