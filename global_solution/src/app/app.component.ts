import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FiltroComponent } from './component/filtro/filtro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FiltroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'global_solution';
}