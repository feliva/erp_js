import {Contato} from "./Contato";
import {Endereco} from "./Endereco";
import {ContatoEmpresa} from "./ContatoEmpresa";

export class Empresa{
  idEmpresa?: number;
  nomeFantasia?: string;
  email?: string;
  razaoSocial?:string
  telefone?:string
  inscricaoEstadual?:string
  listContatosEmpresa?:ContatoEmpresa[];
  endereco?:Endereco;
}
