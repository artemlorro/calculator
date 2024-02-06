import { InputElement } from '../models/InputElement';

export interface IValidationAnswer {
  hasErrors: boolean,
  items: InputElement[]
}

function validateIsBracketBalanced(inputArray: InputElement[]) {

  // Initialising Variables
  let flag = true
  let count = 0
  let openIndexes: number[] = [];
  let closedIndexes: number[] = [];

  // Traversing the Expression
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].value == '(') {
      count += 1
      openIndexes.push(i);
    } else if (inputArray[i].value == ')') {
      count -= 1
      if (openIndexes.length > 0) {
        openIndexes.pop();
      } else {
        closedIndexes.push(i);
      }
    }

    if (count < 0) {
      flag = false
      break
    }
  }
  if (count != 0) {
    flag = false
  }

  let mArray = [...openIndexes, ...closedIndexes]
  if (mArray.length > 0) {
    inputArray[mArray[0]].error = Error('Brackets not balanced')
  }

  return flag
}


function clearValidationErrors(inputArray: InputElement[]): void {
  return inputArray.forEach(((item, index) => inputArray[index].error = null))
}

function validateEnoughValues(inputArray: InputElement[]): InputElement[] {
  if (inputArray.length < 3) {
    inputArray[inputArray.length - 1].error = Error('Not enough values');
  }
  return inputArray;
}

function validateConsecutiveOperands(inputArray: InputElement[]) {
  const operators = ['+', '-', '*', '/', '^', '%'];
  return inputArray.forEach((item, index) => {
    if (operators.includes(item.value) && operators.includes(inputArray[index + 1]?.value)) {
      inputArray[index].error = Error('Two consecutive operands detected');
    }
  })
}

function validateIfLastElementIsOperand(inputArray: InputElement[]) {
  if (inputArray[inputArray.length - 1].type === 'operation' && inputArray[inputArray.length - 1].value !== ')') {
    inputArray[inputArray.length - 1].error = Error('The operand comes at the end of the expression')
  }
}

export function validateInputArray(inputArray: InputElement[]): IValidationAnswer {
  clearValidationErrors(inputArray);
  validateIsBracketBalanced(inputArray);
  validateEnoughValues(inputArray);
  validateConsecutiveOperands(inputArray);
  validateIfLastElementIsOperand(inputArray);
  //The operand comes at the end of the expression

  return {
    hasErrors: inputArray.some(element => element.error),
    items: inputArray
  };
}
