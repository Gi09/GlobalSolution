import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OceanData } from '../interfaces/OceanData';
import { Observable } from 'rxjs';
import { Especie } from '../interfaces/Especie';
import { ProjetoConservacao } from '../interfaces/ProjetoConservacao';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getData(
    regiao?: string,
    especies?: Especie[],
    projetosConservacao?: ProjetoConservacao[],
    temperaturaAgua?: number,
    pH?: number,
    nivelPoluicao?: string
  ): Observable<OceanData[]> {

    let url = `${this.apiUrl}/OceanData?`;

    if (regiao) {
      url += `regiao=${regiao}&`;
    }
    if (especies && especies.length > 0) {
      const nomesEspecies = especies.map(e => e.nome).join(',');
      url += `especies=${nomesEspecies}&`;
    }
    if (projetosConservacao && projetosConservacao.length > 0) {
      const nomesProjetos = projetosConservacao.map(p => p.nomeProjeto).join(',');
      url += `projetosConservacao=${nomesProjetos}&`;
    }
    if (temperaturaAgua) {
      url += `temperaturaAgua=${temperaturaAgua}&`;
    }
    if (pH) {
      url += `pH=${pH}&`;
    }
    if (nivelPoluicao) {
      url += `nivelPoluicao=${nivelPoluicao}&`;
    }

    // Remove o último '&' se necessário
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    return this.http.get<OceanData[]>(url);
  }
}
