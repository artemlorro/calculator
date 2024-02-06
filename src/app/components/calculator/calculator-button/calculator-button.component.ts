import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [
    ButtonModule,
    NgClass
  ],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss'
})
export class CalculatorButtonComponent {
  @Input() name: string | undefined;
  @Input() type: 'operator' | 'digit' | undefined;
  @Output() pressBtn = new EventEmitter<string>();



  onPressBtn() {
    this.pressBtn.emit(this.name)
  }

  getButtonType() {
    return this.type === "digit" ? 'secondary' : 'primary'
  }
}
