import { InputElement } from '../models/InputElement';

export interface ICalculatorService {
  inputArray: InputElement[];

  addDigit(digit: string): void;

  addOperator(operator: string): void;

  deleteChar(): void;

  clear(): void;

  infixToPostfix(): string[];

  evaluatePostfix(postfixExpression: string[]): string;

  doCalculation(): void;
}
