import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { PanelModule } from 'primeng/panel';
import { CalculatorScreenComponent } from './calculator-screen/calculator-screen.component';
import { CalculatorButtonComponent } from './calculator-button/calculator-button.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    PanelModule,
    CalculatorScreenComponent,
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  constructor(private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    //const inputString: string = '2+8*(7^4−2)/(4+(−3*4)*e^2)+300'; //75,3282065543
    //const inputString: string = '2+8*(7^4−2)/(4+(−3*4)*2^2)+300'; //-134,181818182
    // const inputString: string = '2 + 8 * ( 7 ^ 4 − 2 ) / ( 4 + ( 3 * 4 ) * ( 2 ^ 2 ) ) + 2'; //373,076923077
    // const inputString: string = '22 + 0.8 * 4 / 2 - ( e ^ 2 + ( -4 * 2 ) ) / 2'; //373,076923077
    // const inputString: string = '2 + ( 3 - 1 / ( -5 * 2 + 3 ^ 2 ) ) + 2'; //-134,181818182
    // for (let i = 0; i < inputString.length; i++) {
    //   this.calculatorService.addChar(inputString[i]);
    // }
    // this.calculatorService.doCalculation();
  }

  addDigit($event: string) {
    this.calculatorService.addDigit($event);
  }

  addOperation($event: string) {
    this.calculatorService.addOperator($event);
    console.log('operation: ', $event);
  }

  doCalculation(): void {
    this.calculatorService.doCalculation();
  }

  doClear() {
    this.calculatorService.clear();
  }

  doDelete() {
    this.calculatorService.deleteChar();
  }
}
