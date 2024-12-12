import {BuilderRoute} from "../../../util/RouteUtil";
import {CrmEmpresasListComponent} from "./crm-empresas-list.component";
import {CrmEmpresasFormComponent} from "./crm-empresas-form.component";

export const BUILDER_MENU_EMPRESAS:BuilderRoute = new BuilderRoute('crm/empresa/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Empresa').associateWithRote()
        .createLocal('Lista de Empresas',  'listar', CrmEmpresasListComponent, ['CRM']).resetFlag().localToRoot()
        .createLocal('Nova Empresa',  'novo', CrmEmpresasFormComponent, ['CRM']).addRouteData({ehNovo:true}).localToRoot()
        .createLocal('Editar Empresa',  'editar/:id', CrmEmpresasFormComponent, ['CRM']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
