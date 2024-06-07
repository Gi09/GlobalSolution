import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FiltrosService{
  apiUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getData(regiao: string, especies: string, projetosConservacao: string, temperaturaAgua: number, pH: number, nivelPoluicao: string) {
    let url = `${this.apiUrl}/ocean-data?`;

    if (regiao) {
      url += `regiao=${regiao}&`;
    }
    if (especies) {
      url += `especies.nome=${especies}&`;
    }
    if (projetosConservacao) {
      url += `projetosConservacao=${projetosConservacao}&`;
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

    return this.http.get<any[]>(url);
  }
}
 