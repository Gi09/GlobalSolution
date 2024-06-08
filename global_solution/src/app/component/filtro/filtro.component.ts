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

  allOceanData: OceanData[] = [];
  filteredOceanData: OceanData[] = [];
  especiesNomes: string[] = [];
  projetosNomes: string[] = [];

  constructor(private filtrosService: FiltrosService) {
    this.filtrosService.getData().subscribe(data => {
      this.allOceanData = data;
      this.filteredOceanData = data;
      this.prepareNames();
    });
  }

  onSearch() {
    this.filteredOceanData = this.allOceanData.filter(data => {
      const matchesRegiao = !this.filters.regiao || data.regiao.includes(this.filters.regiao);
      const matchesEspecies = !this.filters.especies || this.filters.especies.split(',').every((especie: string) => data.especies.map(e => e.nome.toLowerCase()).includes(especie.trim().toLowerCase()));
      const matchesProjetos = !this.filters.statusConservacao || this.filters.statusConservacao.split(',').every((projeto: string) => data.projetosConservacao.map(p => p.nomeProjeto.toLowerCase()).includes(projeto.trim().toLowerCase()));
      const matchesTemperatura = this.filters.temperaturaAgua === null || data.temperaturaAgua == this.filters.temperaturaAgua;
      const matchesPH = this.filters.pH === null || data.pH == this.filters.pH;
      const matchesNivelPoluicao = !this.filters.nivelPoluicao || data.nivelPoluicao.includes(this.filters.nivelPoluicao);

      return matchesRegiao && matchesEspecies && matchesProjetos && matchesTemperatura && matchesPH && matchesNivelPoluicao;
    });
    this.prepareNames();
  }

  prepareNames() {
    this.especiesNomes = this.filteredOceanData.map(d => d.especies.map(e => e.nome).join(', '));
    this.projetosNomes = this.filteredOceanData.map(d => d.projetosConservacao.map(p => p.nomeProjeto).join(', '));
  }
}
