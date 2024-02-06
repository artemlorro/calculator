import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContainerComponent } from './components/main-container/main-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainContainerComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'calculator';
}
