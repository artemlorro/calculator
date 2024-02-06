import { Component } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { GraphicalFormComponent } from '../graphical-form/graphical-form.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    CalculatorComponent,
    GraphicalFormComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
