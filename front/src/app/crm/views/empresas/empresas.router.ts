import {BuilderRoute} from "../../../util/RouteUtil";
import {CrmEmpresasListComponent} from "./crm-empresas-list.component";
import {CrmEmpresasFormComponent} from "./crm-empresas-form.component";

export const BUILDER_MENU_EMPRESAS:BuilderRoute = new BuilderRoute('crm/empresas/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Empresas').associateWithRote()
        .createLocal('Lista de Empresas',  'listar', CrmEmpresasListComponent, ['CRM']).localToRoot()
        .createLocal('Lista de Empresas',  'listar/:termoBusca', CrmEmpresasListComponent, ['CRM']).localToRoot()
        .createLocal('Nova Empresa',  'novo', CrmEmpresasFormComponent, ['CRM']).addRouteData({ehNovo:true}).localToRoot()
        .createLocal('Editar Empresa',  'editar/:id', CrmEmpresasFormComponent, ['CRM']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
