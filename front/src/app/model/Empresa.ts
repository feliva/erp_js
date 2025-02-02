import {ContatoEmpresa} from "./ContatoEmpresa";
import {Endereco} from "./Endereco";
import {Model} from "./Model";

export class Empresa extends Model{
  idEmpresa?: number;
  nomeFantasia?: string;
  email?: string;
  razaoSocial?: string;
  telefone?: string;
  inscricaoEstadual?: string;
  listContatosEmpresa?: ContatoEmpresa[];
  endereco?: Endereco;

  constructor(data?: Partial<Empresa>) {
    super(data);

    this.listContatosEmpresa = data?.listContatosEmpresa?.map(
        ce => new ContatoEmpresa(ce)
    ) || [];
  }
}