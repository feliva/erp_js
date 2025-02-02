import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Empresa} from "../../../model/Empresa";

@Injectable({
  providedIn: 'root'
})
export class CrmEmpresaService extends FiltroServices<Empresa> {

  protected filtroForm:FormGroup = CrmEmpresaService.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = CrmEmpresaService.inicializaFiltro();
  }

  public override getPath(): string {
    return "/back/crm/empresa";
  }

  static inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

  public getEntityType(): new (data?:any) => Empresa {
    return Empresa; // Retorna o tipo da entidade
  }

  getModel(url: string): Observable<Empresa> {
    return this.http.get<Empresa>(url).pipe(
        map((json:Empresa) => {
          return new Empresa(json);
        })
    );
  }
}
