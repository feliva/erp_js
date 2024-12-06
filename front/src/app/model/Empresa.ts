import {Contato} from "./Contato";
import {Endereco} from "./Endereco";

export class Empresa{
  idEmpresa?: number;
  nomeFantasia?: string;
  email?: string;
  razaoSocial?:string
  telefone?:string
  inscricaoEstadual?:string
  setContatos?:Contato[];
  endereco?:Endereco;
}
