import { Component } from '@angular/core';
import { OceanData } from '../../interfaces/OceanData';
import { FiltrosService } from '../../service/filtros.service';
import { Especie } from '../../interfaces/Especie';
import { ProjetoConservacao } from '../../interfaces/ProjetoConservacao';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent {
  filters: any = {
    regiao: '',
    especies: '',
    statusConservacao: '',
    temperaturaAgua: null,
    pH: null,
    nivelPoluicao: ''
  };

  oceanData: OceanData[] = [];
  especiesNomes: string[] = [];
  projetosNomes: string[] = [];

  constructor(private filtrosService: FiltrosService) {}

  onSearch() {
    console.log('Filters:', this.filters);

    const especiesArray: Especie[] = this.filters.especies.split(',').map((nome: string) => ({ nome: nome.trim(), status: '' }));
    const projetosArray: ProjetoConservacao[] = [];

    this.filtrosService.getData(
      this.filters.regiao,
      especiesArray,
      projetosArray,
      this.filters.temperaturaAgua,
      this.filters.pH,
      this.filters.nivelPoluicao
    ).subscribe(data => {
      console.log('Received Data:', data);
      
      this.oceanData = data;

      // Prepara os nomes das espécies e dos projetos de conservação
      this.especiesNomes = this.oceanData.map(d => d.especies.map(e => e.nome).join(', '));
      this.projetosNomes = this.oceanData.map(d => d.projetosConservacao.map(p => p.nomeProjeto).join(', '));
    });
  }
}
