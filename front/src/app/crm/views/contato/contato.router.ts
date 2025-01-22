import {BuilderRoute} from "../../../util/RouteUtil";
import {CrmContatoListComponent} from "./crm-contato-list.component";
import {CrmContatoFormDdComponent} from "./crm-contato-form-dd.component";

export const BUILDER_MENU_CONTATO:BuilderRoute = new BuilderRoute('crm/contato/')
  .redirectOfTo('','listar').localToRoot()
  .navOpen('Contato').associateWithRote()
        .createLocal('Lista de Contatos',  'listar', CrmContatoListComponent, ['contato']).resetFlag().localToRoot()
        .createLocal('Lista de Contatos',  'listar/:termoBusca', CrmContatoListComponent, ['contato']).localToRoot()
        .createLocal('Novo Contato',  'novo', CrmContatoFormDdComponent, ['contato']).addRouteData({ehNovo:true}).localToRoot()
        .createLocal('Editar Contato',  'editar/:id', CrmContatoFormDdComponent, ['contato']).addRouteData({ehNovo:false}).localToRoot()
    // .createLocal('Editar Unidade', 'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;
