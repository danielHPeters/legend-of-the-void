/**
 * Simple postfix calculator.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class PostFixCalculator {
  static VALID_INPUT = '^\\s*([-+]?)(\\d+)(?:\\s*\\s*([-+]?)(\\d+)\\s*([-+*\\/\\^]))+$'

  static calculate (input: string): number {
    let result = null
    if (input.match(PostFixCalculator.VALID_INPUT)) {
      let tokens = input.split(' ')
      let operation = []

      tokens.forEach(token => {
        if (isNaN(Number(token))) {
          const operand2 = operation.pop()
          const operand = operation.pop()

          switch (token) {
            case '+':
              result = operand + operand2
              break
            case '-':
              result = operand - operand2
              break
            case '*':
              result = operand * operand2
              break
            case '/':
              if (operand2 !== 0) {
                result = operand / operand2
              } else {
                throw new Error('Division by zero not allowed!')
              }
              break
            case '^':
              result = Math.pow(operand, operand2)
              break
            default:
              throw new Error('Internal error!')
          }
          operation.push(result)
        } else {
          operation.push(Number(token))
        }
      })
    } else {
      throw new Error('The expression is not valid!')
    }
    return result
  }
}
