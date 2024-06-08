import { Especie } from "./Especie";
import { ProjetoConservacao } from "./ProjetoConservacao";

export interface OceanData{
    regiao:string,
    temperaturaAgua:number,
    pH:number,
    nivelPoluicao:string,
    especies:Especie[],
    projetosConservacao:ProjetoConservacao[]
}