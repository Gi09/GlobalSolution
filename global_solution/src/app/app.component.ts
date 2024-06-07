import { Component } from '@angular/core';
import { FiltrosService } from './service/filtros.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  regiao: string = "";
  especies: string = "";
  projetosConservacao: string = "";
  temperaturaAgua: number = 0;
  pH: number = 0;
  nivelPoluicao: string = "";
  filteredData: any[] = [];

  constructor(private apiService: FiltrosService) { }

  applyFilters() {
    this.apiService.getData(this.regiao, this.especies, this.projetosConservacao, this.temperaturaAgua, this.pH, this.nivelPoluicao)
      .subscribe((data: any[]) => {
        this.filteredData = data;
      });
  }
}
