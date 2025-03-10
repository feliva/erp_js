import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";
import {TipoContatoEmpresa} from "../../../model/TipoContatoEmpresa";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CrmTipoContatoEmpresaService extends FiltroServices<TipoContatoEmpresa> {

  protected filtroForm:FormGroup = this.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = this.inicializaFiltro();
  }

  public override getPath(): string {
    return "/back/crm/tipoContatoEmpresa";
  }

  public inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }
  public getEntityType(): new () => TipoContatoEmpresa {
    return TipoContatoEmpresa; // Retorna o tipo da entidade
  }

  getModel<Empresa>(url: string): Observable<Empresa> {
    // @ts-ignore
    return this.http.get<Empresa>(url).pipe(
        map((json:Empresa) => {
          // @ts-ignore
          return new Empresa(json);
        })
    );
  }
}
