import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalculatorService } from '../../../services/calculator.service';
import { FormsModule } from '@angular/forms';
import { InputElement, makeStringFromInputElementsArray } from '../../../models/InputElement';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-calculator-screen',
  standalone: true,
  imports: [
    InputTextareaModule,
    InputTextModule,
    FormsModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './calculator-screen.component.html',
  styleUrl: './calculator-screen.component.scss'
})
export class CalculatorScreenComponent implements OnInit, OnDestroy {
  hasInputError: InputElement | undefined = undefined;
  expressionString: string = '';
  expressionArray: InputElement[] | undefined = undefined;
  resultString: string = '';

  constructor(private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.calculatorService.subjInput.subscribe((value) => {
      this.expressionArray = undefined;
      if (value) {
        this.hasInputError = value.find(item => item.error);
        this.expressionString = makeStringFromInputElementsArray(value);
        this.expressionArray = value;
      }
    })
    console.log('subscription hasInputError', this.hasInputError);
    this.calculatorService.subjResult.subscribe(value => this.resultString = value)
  }

  ngOnDestroy() {
    this.calculatorService.subjInput.unsubscribe();
    this.calculatorService.subjResult.unsubscribe();
  }

}

