// Project built using Vanilla Javascript with ES6 Standards
// Best Solution is to set up a Class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // Limit set to only add one period
        // Check - if Period Key is typed and Already have a Period Key typed, return (stop function from running any further)
        if (number === '.' && this.currentOperand.includes('.')) return
            // Want Numbers to be Appended and not Added i.e 1 and 1 is 11 not 1+1
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // Check - Not To Execute if the Value is Empty
        if (this.currentOperand === '') return
            // Check - 
        if (this.previousOperand !== '') {
            // Update Variables as Needed
            this.compute()
        }
        // Set the Operation to Whatever is Passed In
        this.operation = operation
            // Recycle to Previous Operant
        this.previousOperand = this.currentOperand
            // Clear Out Value
        this.currentOperand = ''
    }

    compute() {
        // Create a Variable to Enable Computation
        let computation
            // Convert String to a Number
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
            // Check if the user doesnt enter anyything and press enter, we don't want the code to run - cancel
        if (isNaN(prev) || isNaN(current)) return
            // Switch statement - bunch of if statements on a single function (this.operation)
        switch (this.operation) {
            // Define using CASE, what the operation should equal
            case '+':
                // all the code will be executed when this.operation = +
                computation = prev + current
                    // Not to follow any other of the case statements and just read the switch statement completely
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
                // Define Else Statement (default in the switch statement)
                // If none of these symbols match, don't do any computation
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    // Helper Function to use Delimiters as Commas 
    getDisplayNumber(number) {
        // Split String on the Decimal Character
        const stringNumber = number.toString()
            // Get Integer Numbers, takes string, turn to array, first part before the period, next after the period
        const integerDigits = parseFloat(stringNumber.split('.')[0])
            // Get Numbers after the Decimal Place
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
            // imputs nothing or decimal place
        if (isNaN(integerDigits)) {
            // Empty Value
            integerDisplay = ''
        } else {
            // never be any decimal places after this value after converted to string with bunch of commas
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        // if there is no decimal degits, return integer display
        else {
            return integerDisplay
        }


        // const decimalDigits = stringNumber.split('')[1]
        //     // String convert to number
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
            // If we have an operation, display previous operand text element
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        // Recycle to Previous Operand to the top element
        // this.previousOperandTextElement.innerText = this.previousOperand
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}



// First - Select the Buttons from the Calculator
// .querySelectorAll - works best for multiple elements
// .querySelectorAll - works best for single element
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Create Calculator Object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
    // Select Number Buttons - useing forEach to loop over all the different buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //  Append Whatever Is Inside The Button
        calculator.appendNumber(button.innerText)
            //  Add Number It To Display and Update Each Time a Button Is Pressed
        calculator.updateDisplay()
    })
})

// Operation Buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //  Instead of Appending a Number Append an Operation
        calculator.chooseOperation(button.innerText)
            //  Add Number To Display and Update Each Time a Button Is Pressed
        calculator.updateDisplay()
    })
})

// Equals Button
equalsButton.addEventListener('click', button => {
    // Call Compute Function
    calculator.compute()
        // Update Display
    calculator.updateDisplay()

})

// All Clear Button
allClearButton.addEventListener('click', button => {
    // Call Compute Function
    calculator.clear()
        // Update Display
    calculator.updateDisplay()

})

// Delete Button
deleteButton.addEventListener('click', button => {
    // Call Compute Function
    calculator.delete()
        // Update Display
    calculator.updateDisplay()

})