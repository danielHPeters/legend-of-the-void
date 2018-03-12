/**
 * Collection of WebGL initialization methods.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class WebGL {
  /**
   * Initialize the WebGL context.
   *
   * @param {HTMLCanvasElement} canvasElement Canvas element on which the scenes will be drawn.
   * @returns {WebGLRenderingContext} WebGL Context
   */
  static initContext (canvasElement: HTMLCanvasElement): WebGLRenderingContext {
    let gl = null

    try {
      gl = canvasElement.getContext('webgl') || canvasElement.getContext('experimental-webgl')
    } catch (e) {
      console.log('Failed to initialize webgl context! Error message: ' + e.message)
    }

    return gl
  }

  /**
   * Initialize vertex and fragment shaders.
   *
   * @param {WebGLRenderingContext} gl WebGL context
   */
  static initShaders (gl: WebGLRenderingContext): void {
    const fragmentShader = WebGL.getShader(gl, 'shader-fs')
    const vertexShader = WebGL.getShader(gl, 'shader-vs')
    const shaderProgram = gl.createProgram()
    let vertexPositionAttribute

    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log('Initialisation of shader program failed.')
    }

    gl.useProgram(shaderProgram)

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
    gl.enableVertexAttribArray(vertexPositionAttribute)
  }

  /**
   * Get a shader from a script by script tag id.
   *
   * @param {WebGLRenderingContext} gl WebGL context
   * @param {string} id Script tag id
   * @returns {WebGLShader} Shader instance
   */
  static getShader (gl: WebGLRenderingContext, id: string): WebGLShader {
    const shaderScript = document.getElementById(id) as HTMLScriptElement

    if (!shaderScript) {
      return null
    }

    let shaderSource = ''
    let currentChild = shaderScript.firstChild

    while (currentChild) {
      if (currentChild.nodeType === 3) {
        shaderSource += currentChild.textContent
      }
      currentChild = currentChild.nextSibling
    }

    let shader

    if (shaderScript.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER)
    } else if (shaderScript.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER)
    } else {
      return null
    }

    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log('An error occurred when trying to compile the shader source: ' + gl.getShaderInfoLog(shader))
      return null
    }

    return shader
  }
}
