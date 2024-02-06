import { Injectable } from '@angular/core';
import { ICalculatorService } from '../interfaces/ICalculatorService';
import { evaluatePostfix, infixToPostfix } from '../helpers/mathematical-operations.helper';
import { Subject } from 'rxjs';
import { createTreeFromPostfix } from '../helpers/tree.helper';
import { InputElement } from '../models/InputElement';
import { IValidationAnswer, validateInputArray } from '../helpers/validation.helper';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService implements ICalculatorService {
  inputArray: InputElement[] = [];

  subjInput = new Subject<InputElement[]>();
  subjResult = new Subject<string>();
  subjTree = new Subject<TreeNode[]>();

  constructor() {
  }

  addDigit(digit: string): void {
    const lastElement: InputElement | undefined = this.inputArray[this.inputArray.length - 1];
    if (lastElement && lastElement?.type === 'digit') {
      lastElement.addToValueStr(digit);
    } else {
      this.inputArray.push(new InputElement(digit, 'digit'))
    }
    console.log('this.inputArray', this.inputArray);
    this.subjInput.next(this.inputArray);
  }

  addOperator(operator: string): void {
    this.inputArray.push(new InputElement(operator, 'operation'))
    this.subjInput.next(this.inputArray);
  }

  deleteChar(): void {
    const lastElement: InputElement | undefined = this.inputArray[this.inputArray.length - 1];
    if (lastElement && lastElement.type === 'digit' && lastElement?.value.length > 0) {
      console.log(lastElement.value.length);
      lastElement.deleteFromValueStr();
      if(lastElement.value.length === 0 || lastElement.value === '0') {
        this.inputArray.pop();
      }
    } else {
      this.inputArray.pop()
    }
    this.subjInput.next(this.inputArray);
  }

  clear(): void {
    this.inputArray = [];
    this.subjInput.next([]);
    this.subjResult.next('');
    this.subjTree.next([]);
  }

  infixToPostfix(): string[] {
    const result: string[] = infixToPostfix(this.inputArray);
    console.log('infixToPostfix result ', result.join(' '));
    return result;
  }

  evaluatePostfix(postfixExpression: string[]): string {
    const result: string = evaluatePostfix(postfixExpression);
    console.log('evaluatePostfix result ', result);
    this.subjResult.next(result);
    return result;
  }

  doCalculation(): void {
    console.log(this.inputArray);
    const validation: IValidationAnswer = validateInputArray(this.inputArray);
    this.subjInput.next(validation.items);
    if(!validation.hasErrors) {
      const postfixExpression: string[] = this.infixToPostfix();
      this.evaluatePostfix(postfixExpression);
      const tree = createTreeFromPostfix(postfixExpression);
      this.subjTree.next(tree);
    }
    else {
      this.subjResult.next('');
      this.subjTree.next([]);
    }
  }

}
