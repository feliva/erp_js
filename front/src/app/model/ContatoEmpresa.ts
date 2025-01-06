import {Empresa} from "./Empresa";
import {Contato} from "./Contato";
import {TipoContatoEmpresa} from "./TipoContatoEmpresa";

export class ContatoEmpresa {
    idContatoEmpresa?: number;
    empresa?: Empresa;
    contato?: Contato;
    tipoContatoEmpresa?: TipoContatoEmpresa;
}