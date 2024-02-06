import { InputElement } from '../models/InputElement';

function precedence(operation: string) {
  if (operation == '^' || operation == '%')
    return 3;
  else if (operation == '*' || operation == '/')
    return 2;
  else if (operation == '+' || operation == '-')
    return 1;
  else
    return -1;
}

export function infixToPostfix(infixString: InputElement[]): string[] {
  let stack: string[] = [];
  let resultArray: string[] = [];

  for (let i = 0; i < infixString.length; i++) {
    let char: string = infixString[i].value;

    if(char === 'e') {
      char = '2.71828182845904'
    }

    if (!isNaN(parseFloat(char))) {
      resultArray.push(char);
    }

    else if (char == '(') {
      stack.push('(');
    }

    else if (char == ')') {
      while (stack[stack.length - 1] !== '(') {
        resultArray.push(stack[stack.length - 1]);
        stack.pop();
      }
      stack.pop();
    }

    else {
      while (stack.length != 0 && precedence(infixString[i].value) <= precedence(stack[stack.length - 1])) {
        resultArray.push(stack[stack.length - 1]);
        stack.pop();
      }
      stack.push(char);
    }
  }
  while (stack.length != 0) {
    resultArray.push(stack[stack.length - 1]);
    stack.pop();
  }
  console.log('resultArray', resultArray)
  return resultArray;
}

export function evaluatePostfix(postfixExpression: string[]): string {
  let stack: Array<any> = [];

  for (let i = 0; i < postfixExpression.length; i++) {
    let value = postfixExpression[i];

    if (!isNaN(parseInt(value))) {
      stack.push(parseFloat(value));
    }

    else {
      let val1 = stack.pop();
      let val2 = stack.pop();

      switch (value) {
        case '+':
          stack.push(val2 + val1);
          break;

        case '-':
          stack.push(val2 - val1);
          break;

        case '/':
          stack.push(val2 / val1);
          break;

        case '*':
          stack.push(val2 * val1);
          break;

        case '^':
          stack.push(val2 ** val1)
          break;

        case '%':
          stack.push(val2 % val1)
          break;
      }
    }
  }
  return stack.pop();
}
