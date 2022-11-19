class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear();
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined

    this.updateDisplay()
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)

    this.updateDisplay()
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand += number.toString()

    this.updateDisplay()
  }

  chooseOperation(operation) {
    if(this.previousOperand !== '' && this.currentOperand !== '') {
      this.compute();
    }

    this.operation = operation

    if(this.previousOperand === '') {
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    
    this.updateDisplay();
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }

    this.previousOperandTextElement.innerText = this.previousOperand + this.operation + this.currentOperand + "="

    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ''

    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = stringNumber.split('.')[0]
    const decimalDigits = stringNumber.split('.')[1]
    
    let integerDisplay
    if (integerDigits == '') {
      integerDisplay = ''
    } else {
      integerDisplay = parseFloat(integerDigits).toLocaleString('en')
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    this.previousOperandTextElement.innerText = this.previousOperand
    if(this.operation != null) {
      this.previousOperandTextElement.innerText += ` ${this.operation}`
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
  })
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
})

deleteButton.addEventListener('click', () => {
  calculator.delete();
})