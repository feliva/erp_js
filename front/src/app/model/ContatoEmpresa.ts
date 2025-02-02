import {Empresa} from "./Empresa";
import {Contato} from "./Contato";
import {TipoContatoEmpresa} from "./TipoContatoEmpresa";
import {Model} from "./Model";

export class ContatoEmpresa extends Model{
    idContatoEmpresa?: number;
    empresa?: Empresa;
    contato?: Contato;
    tipoContatoEmpresa?: TipoContatoEmpresa;

    transientId?:string;

    getTransientId(){
        if(!this.transientId) {
            if (this.idContatoEmpresa == null) {
                this.transientId = crypto.randomUUID();
            } else {
                this.transientId = this.idContatoEmpresa.toString();
            }
        }

        return this.transientId;
    }

    constructor(data?: any) {
        super(data);
    }
}