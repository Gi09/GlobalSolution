import { Especie } from "./Especie";
import { ProjetoConservacao } from "./ProjetoConservacao";

export interface OceanData{
    regiao:string,
    temperaturaAgua:number,
    ph:number,
    nivelPoluicao:string,
    especie:Especie[],
    projetosConservacao:ProjetoConservacao[]
}